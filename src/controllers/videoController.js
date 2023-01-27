import Video from "../models/Video";

export const home = (req, res) => {
  //{} 빈 중괄호의 의미는 search terms로써 비어있으면 모든 형식을 찾음
  console.log("DB 검색 시작");
  Video.find({}, (err, videos) => {
    console.log("DB 검색 끝");
    return res.render("home", { pageTitle: "Home", videos });
  });
  console.log("DB 검색 마지막 줄");
};
export const watch = (req, res) => {
  const { id } = req.params;
  res.render("watch", { pageTitle: `Watching` });
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

export const postUpload = (req, res) => {
  // 이곳에서 비디오를 videos array에 추가할 예정
  return res.redirect("/");
};
