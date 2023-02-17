import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile = null;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  const mp4File = ffmpeg.FS("readFile", "output.mp4");

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });

  const mp4Url = URL.createObjectURL(mp4Blob);

  const a = document.createElement("a");

  // File System (형식, 파일이름, 바이너리 데이터)

  // 변환 작업 -i 는 input 작업 -r 60은 초당 60프레임

  a.href = mp4Url;
  a.download = "MyRecording.mp4";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = async () => {
  await init();
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start(); //MediaRecorder를 사용하기때문에 사용 가능
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 200, height: 150 },
  });
  video.srcObject = stream;
  video.play();
};

startBtn.addEventListener("click", handleStart);
