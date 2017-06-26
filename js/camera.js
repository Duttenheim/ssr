
//------------------------------------------------------------------------------
/**
   Global variables:
   CameraVideoSelect is the name of the element for selecting the video device
   CameraVideoDisplayDiv is the name of the div in which the video should appear
*/
var CameraVideoSelect = null;
var CameraVideoDisplayDiv = null;
var ReadoutCanvasDiv = null;

//------------------------------------------------------------------------------
/**
   Callback for when a stream is selected
*/
function OnStream(stream)
{
	var video = CameraVideoDisplayDiv;
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
	var video = CameraVideoSelect;

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
   @param cameraSelect is the name of the <select> element used to contain the list of available camera devices.
   @param cameraDisplayDiv is the name of the <video> div.
   @param cameraCanvas is the name of the <canvas> div to which the video should be output.
   @param errorCallback is the function to call if there are any errors setting the camera up
*/
function CameraStartup(cameraSelect, cameraDisplayDiv, successCallback, errorCallback)
{
	CameraVideoSelect = document.getElementById(cameraSelect);
	CameraVideoDisplayDiv = document.getElementById(cameraDisplayDiv);
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	var select = CameraVideoSelect;
	navigator.mediaDevices.enumerateDevices()
		.then(OnDevices)
		.then(function()
			  {
				  var constraints = {audio: false, video: {facingMode: "environment", 
														   width: 1920,
														   height: 1080
														  }};
//														   width: { min: 640, ideal: 1280, max: 1920 }, 
//														   height: { min: 480, ideal: 720, max: 1080 }}};
				  navigator.mediaDevices.getUserMedia(constraints).then(OnStream).then(successCallback).catch(errorCallback);
			  }
			 ).catch(errorCallback);
}

//------------------------------------------------------------------------------
/**
   Start blitting image data to canvas, and return image buffer, for filtering and image processing
   @param callback is a function to call when a QR code is found
*/
function ReadPixelsStartup(callback)
{
	ReadoutCanvasDiv = document.createElement("canvas");
	ReadoutCanvasDiv.style.display = 'none';
	var ctx = ReadoutCanvasDiv.getContext("2d");

	setInterval(function() {
		let width = CameraVideoDisplayDiv.videoWidth;
		let height = CameraVideoDisplayDiv.videoHeight;

		// if dimensions are 0, skip frame
		if (width == 0) return;

		// resize canvas and get new context
		ReadoutCanvasDiv.width = width;
		ReadoutCanvasDiv.height = height;
		var ctx = ReadoutCanvasDiv.getContext("2d");

		// draw image to canvas, basically a GPU blit
		ctx.drawImage(CameraVideoDisplayDiv, 0, 0, width, height);
		var data = ctx.getImageData(0, 0, width, height);
		callback(data);
	}, 100);
}
