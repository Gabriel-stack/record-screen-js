var media;
const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const mainSection = document.querySelector('.main-controls');

record.addEventListener('click',function(e){
  if (navigator.mediaDevices.getDisplayMedia) {
    navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        mediaSource: 'screen'
      }
    }).then(stream => success(stream), error());
  }
});
stop.addEventListener('click', function(e){
  record.style.backgroundColor = "transparent";
  record.disabled = false;
  stop.disabled = true;
  media.stop()
})
function success(stream){
  let data = new Array();
  media =  new MediaRecorder(stream);
  media.ondataavailable = (blob) => data.push(blob.data);
  media.start();
  media.onstop = e => createVideo(data);
  record.style.backgroundColor = 'red';
  record.disabled = true;
  stop.disabled = false;
  stop.style.cursor = 'pointer'
}

function error(err) { 
    console.log(err);
}

function createVideo(data) {
  let videoUrl = URL.createObjectURL(new Blob(data, {type: 'video/mp4', download: true}));
  let video = document.createElement("video");
  record.style.backgroundColor = "#18e370";
  record.disabled = false;
  stop.disabled = true;
  video.controls = true;
  video.style.display = 'block';
  video.src = videoUrl;
  mainSection.insertBefore(video, mainSection.firstChild);
}


