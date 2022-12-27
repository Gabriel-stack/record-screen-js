import Buttons from "./style.js";
var mediaInstance = null;
var mediaStream;
var range = document.createRange();
const record = document.querySelector(".record");
const stop = document.querySelector(".stop");
const mainSection = document.querySelector(".main-controls");
const videosContainer = document.querySelector(".videos-container");

record.addEventListener("click", function (e) {
  if (navigator.mediaDevices.getDisplayMedia) {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          mediaSource: "screen",
        },
      })
      .then((stream) => success(stream), error());
  }
});
stop.addEventListener("click", function (e) {
  stop.disabled = true;
  mediaStream.getTracks().forEach((track) => track.stop());
  mediaInstance.stop();
  document.querySelector(".video-live").remove();
});

function success(stream) {
  mediaStream = stream;
  let data = [];
  mediaInstance = new MediaRecorder(stream);
  mediaInstance.ondataavailable = (blob) => data.push(blob.data);
  mediaInstance.start();
  mediaInstance.onstart = () => displayVideoLive(stream);
  mediaInstance.onstop = () => createVideo(data);
  Buttons.ChangeStyleButtons(record, stop);
}

function error(err) {
  console.warn(err);
}

function displayVideoLive(stream) {
  let video = document.createElement("video");
  video.classList.add("video-live");
  video.style.display = "block";
  video.srcObject = stream;
  mainSection.insertBefore(video, mainSection.firstChild);
  video.play();
}

function showVideo(el) {
  let showedVideo = document.querySelector(".show-video");
  let videoPlay = document.querySelector(".show-video video");
  showedVideo.style.display = "flex";
  videoPlay.hidden = false;
  videoPlay.src = el.target.src;
  videoPlay.style.width = "clamp(300px, 50%, 800px)";
  videoPlay.style.height = "clamp(150px, 50%, 500px)";
}
function createVideo(data) {
  let videoUrl = URL.createObjectURL(
    new Blob(data, { type: "video/mp4", download: true })
  );
  let video = document.createElement("video");
  video.src = videoUrl;
  video.onclick = e => showVideo(e);
  let template = `<div class="recorded-video">
                      <a href="${videoUrl}" download="video.mp4" class="download">Download</a>
                  </div>`;
  let fragment = range.createContextualFragment(template);
  let video_container = fragment.firstChild;
  video_container.insertBefore(video, video_container.firstChild);
  Buttons.InitialStyleButtons(record, stop);
  videosContainer.insertBefore(video_container, videosContainer.firstChild);
}