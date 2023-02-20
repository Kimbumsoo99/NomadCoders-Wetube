import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const { id } = videoContainer.dataset;
  await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    body: {
      text,
    },
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
