'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

var video = document.querySelector('video');

function successCallback(stream)
{
	window.stream = stream; // stream available to console
	if (window.URL)
	{
		video.src = window.URL.createObjectURL(stream);
	}
	else
	{
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
							FetchAllSensors(function(json)
											{
												var i = 5;
											}
										   );

							SensorViz("scene", {x: 1000, y: 0, z: 0}, "EnviormentalSensor_Sokigo1", 50);
							SensorViz("scene", {x: -1000, y: 0, z: 0}, "Sokigo_spatial", 50);
							SensorViz("scene", {x: 0, y: 0, z: -1000}, "EnviormentalSensor_S0", 50);
							SensorViz("scene", {x: 0, y: 0, z: 1000}, "EnviormentalSensor_S1", 50);

							var dev = new Device("camera-mode", "map-mode");
							dev.BindToCamera("cameraTransform");
						});