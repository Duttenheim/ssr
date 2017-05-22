
//------------------------------------------------------------------------------
/**
   Global variables:
   CameraVideoSelect is the name of the element for selecting the video device
   CameraVideoDisplayDiv is the name of the div in which the video should appear
*/
var CameraVideoSelect = "";
var CameraVideoDisplayDiv = "";

//------------------------------------------------------------------------------
/**
   Callback for when a stream is selected
*/
function OnStream(stream)
{
	var video = document.getElementById(CameraVideoDisplayDiv);
	window.stream = stream;
	video.srcObject = stream;
}

//------------------------------------------------------------------------------
/**
   Callback for when the device enumeration is done.
   Tries to find a camera which contains 'back' and selects it automatically.
*/
function OnDevices(devices)
{
	var video = document.getElementById(CameraVideoSelect);

	// clear options
	while (video.firstChild)
	{
		video.removeChild(video.firstChild);
	}

	var cameras = [];
	var backCameraIndex = -1;
	for (var i = 0; i < devices.length; i++)
	{
		var device = devices[i];
		if (device.kind == 'videoinput')
		{
			var option = document.createElement("option");
			option.value = device.deviceId;
			option.text = device.label;
			cameras.push(option);
			if (device.label.search("back") != -1) backCameraIndex = cameras.length-1;
			//video.appendChild(option);
		}
	}
	if (backCameraIndex != -1)
	{
		if (cameras.length > 1)
		{
			var temp = cameras[0];
			cameras[0] = cameras[backCameraIndex];
			cameras[backCameraIndex] = temp;
		}
	}
	for (var i = 0; i < cameras.length; i++)
	{
		video.appendChild(cameras[i]);
	}
	
	video.addEventListener("change", function()
						   {
							   var select = {video: video.value};
							   CameraStartup(null);
						   });
}

//------------------------------------------------------------------------------
/**
   Entry point function for starting the camera, be sure to set the two global variables at the top of this file prior
   @param errorCallback is the function to call if there are any errors setting the camera up
*/
function CameraStartup(cameraSelectDiv, cameraDisplayDiv, errorCallback)
{
	CameraVideoSelect = cameraSelectDiv;
	CameraVideoDisplayDiv = cameraDisplayDiv;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	var select = document.getElementById(CameraVideoSelect);
	navigator.mediaDevices.enumerateDevices().then(OnDevices).then(function()
																   {
																	   var constraints = {audio: false, video: {deviceId: select.value}}; 
																	   navigator.mediaDevices.getUserMedia(constraints).then(OnStream).catch(errorCallback);
																   }
																  ).catch(errorCallback);
}