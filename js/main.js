'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

var video = document.querySelector('video');

function successCallback(stream) {
  window.stream = stream; // stream available to console
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);

window.addEventListener("load", function()
						{
							var vid = document.getElementById("video");
							if (vid.requestFullscreen)
							{
								vid.requestFullscreen();
							}
							if (screen.lockOrientation)
							{
								var orientation = screen.lockOrientation("portrait");
							}

							// test
							FetchAllSensors();

							var dev = new Device("camera-mode", "map-mode");
							dev.BindToCamera("cameraTransform");
						});