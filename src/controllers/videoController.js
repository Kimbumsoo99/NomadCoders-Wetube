import Video from "../models/Video";

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
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  console.log(video);
  res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  // 이곳에서 비디오를 videos array에 추가할 예정
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
