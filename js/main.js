
CameraStartup("video-select", "video", function(err) {alert(err);});

var Map;
var Me;
function SetupMap()
{
	var uluru = {lat: -25.363, lng: 131.044};
	Map = new google.maps.Map(document.getElementById('map-mode'), 
							  {
								  zoom: 90,
								  center: uluru,
								  mapTypeId: 'terrain'
							  });
	Me = new google.maps.Marker(
		{
			position: uluru,
			map: Map
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

							var dev = new Device("camera-mode", "map-mode");
							dev.BindToCamera("cameraTransform");

							dev.TrackLocation(function(position)
											  {
												  var latlong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
												  Me.setPosition(latlong);
												  Map.setCenter(latlong);
											  });
						});