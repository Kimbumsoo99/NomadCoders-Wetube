import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const spanText = document.createElement("span");
  spanText.innerText = `  ${text}`;
  const spanDelete = document.createElement("span");
  spanDelete.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(spanText);
  newComment.appendChild(spanDelete);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const { id } = videoContainer.dataset;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //express에 우리는 string을 보내는것이아니라 json string이라는것을 알려줌
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};
// JSON.stringify는 json 객체를 {"text":"i like it","rating":"5"} 의 형태로 바꿔줌
//backend에서는 이것을 JS object로 바꿔준다 express.json() 을 통해서
// headers 를 통해 frontend에서 back으로 데이터를 보낼때 string이아닌 json이라는것을 알ㅇ려준다.

if (form) {
  form.addEventListener("submit", handleSubmit);
}

const deleteBtn = document.getElementById("deleteBtn");
