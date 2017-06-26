

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

							CameraStartup("video-select", "video", function()
										  {
											  ReadPixelsStartup(function(data) { qr.Update(data); });

											  // start parsing QR
											  var qr = new QR("video");
											  qr.AddListener("p", function(pos)
															 {
																 alert(pos);
															 });
											  
										  }, function(err) {alert(err);}
										 );


							var dev = new Device("camera-mode", "map-mode");
							dev.BindToCamera("cameraTransform");

							dev.TrackLocation(function(position)
											  {
												  var latlong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
												  GMe.setPosition(latlong);
												  GMap.setCenter(latlong);
											  });
						});