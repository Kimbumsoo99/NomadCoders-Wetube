import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";
import { async } from "regenerator-runtime";

//콜백 함수 형식
//{} 빈 중괄호의 의미는 search terms로써 비어있으면 모든 형식을 찾음
/* 콜백과 async의 차이
Video.find({}, (err, videos) => {
  if(err){
    return res.render("server-error")
  }
  return res.render("home", { pageTitle: "Home", videos });
});

*/
export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", {
    pageTitle: `Edit: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, description, hashtags },
    files: { video, thumb },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path.replace(/[\\]/g, "/"),
      thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const owner = await User.findById(video.owner);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  // 비디오 내부 댓글 삭제
  await Comment.deleteMany({ video: id });
  // 유저 정보에서 비디오 정보 삭제
  objRemove(owner.videos, id);
  await owner.save();
  // 비디오 삭제
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
        //$gt: 3,  //3보다 큰 것
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { user },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment);
  await video.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
  } = req;

  const comment = await Comment.findById(id).populate("video");
  if (!comment) {
    return res.sendStatus(404);
  }
  const video = await Video.findById(comment.video._id);
  objRemove(video.comments, id);
  await video.save();
  await Comment.findOneAndDelete({ _id: id });
  return res.sendStatus(200);
};

const objRemove = (obj, id) => {
  obj.forEach((item, index) => {
    if (String(item) === id) {
      obj.splice(index, 1);
    }
  });
};
