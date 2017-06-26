

var GMap;
var GMe;
function SetupGMap()
{
	var uluru = {lat: -25.363, lng: 131.044};
	GMap = new google.maps.Map(document.getElementById('map-mode'), 
							  {
								  zoom: 90,
								  center: uluru,
								  mapTypeId: 'terrain'
							  });
	GMe = new google.maps.Marker(
		{
			position: uluru,
			map: GMap
		});
}

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

							CameraStartup("video-select", "video", function(err) {alert(err);});
							ReadPixelsStartup(function(data) { qr.Update(data); }, 1000);

							var dev = new Device("camera-mode", "map-mode");
							dev.BindToCamera("cameraTransform");
							dev.TrackLocation(function(position)
											  {
												  var latlong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
												  GMe.setPosition(latlong);
												  GMap.setCenter(latlong);
											  });

							// start parsing QR
							var qr = new QR("video")
							qr.AddListener("p", function(pos)
										   {
											   var msg = document.getElementById("overlay-message");
											   var newMsg = msg.cloneNode(true);
											   newMsg.innerHTML = "Position acquired!";
											   newMsg.className = "blink";
											   msg.parentNode.replaceChild(newMsg, msg);
											   var coord1 = pos[0].split(":");
											   var coord2 = pos[1].split(":");											   
											   if (coord1[0] == "lat")
											   {
												   dev.ForceLocation(parseFloat(coord1[1]), parseFloat(coord2[1]));
											   }
											   else
											   {
												   dev.ForceLocation(parseFloat(coord2[1]), parseFloat(coord1[1]));
											   }
											   
										   });	
						});