

var GMap;
var GMe;
function SetupGMap()
{
	var uluru = {lat: -25.363, lng: 131.044};
	GMap = new google.maps.Map(document.getElementById('map-mode'), 
							  {
								  zoom: 8,
								  center: uluru,
								  //mapTypeId: 'terrain'
							  });
	GMe = new google.maps.Marker(
		{
			position: uluru,
			map: GMap
		});
}

window.addEventListener("load", function()
						{
							InitiateFullscreen();

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
							InitiateCapture(function(data) { qr.Update(data); }, 1000);

							var dev = new Device("camera-mode", "map-mode", function() { StartCapture(); }, function() { StopCapture(); GMap.setZoom(8); GMap.setCenter(GMe.getPosition()); });
							document.getElementById("map-mode").addEventListener("resize", function()
																				 {
																					 if (GMap)
																					 {
																						 GMap.setZoom(8);
																						 GMap.panTo(GMe.getPosition());
																					 }
																				 }
																				);
							dev.BindToCamera("cameraTransform");
							dev.TrackLocation(function(position)
											  {
												  if (GMe)
												  {
													  GMe.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
												  }
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