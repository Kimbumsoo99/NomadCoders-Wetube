export const trending = (req, res) => {
  const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => {
  return res.render("watch");
};
export const edit = (req, res) => {
  return res.render("edit");
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
