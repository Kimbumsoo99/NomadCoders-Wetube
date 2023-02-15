const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const buteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayClick = (e) => {
  // if 비디오 재생중이면? 재생
  // else 일시정지
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const handlePause = (e) => {
  playBtn.innerText = "Play";
};

const handlePlay = (e) => {
  playBtn.innerText = "Play";
};

const handleMute = (e) => {
  // 음소거
};

playBtn.addEventListener("click", handlePlayClick);
buteBtn.addEventListener("click", handleMute);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
