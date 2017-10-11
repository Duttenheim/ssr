

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
							
	// setup shader for billboard rendering
	SetupBillboardShader();

	// LORA_Sensor
	SensorVizBillboard("scene", "defs", {x: 0, y: 0, z: 1}, "EnvironmentalSensor_S2", "sensor", "icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: 10, y: 0, z: 1}, "EnvironmentalSensor_S3", "sensor", "icons/romantic.jpg", 50);
	
	CameraStartup("video-select", "video", function(err) {alert(err);});

	var qr = new QR("video")
	InitiateCapture(function(data) { qr.Update(data); }, 1000);
	
	var dev = new Device("camera-mode", "map-mode", function() { StartCapture(); }, function() { StopCapture(); GMap.setZoom(8); GMap.setCenter(GMe.getPosition()); });
	document.getElementById("map-mode").addEventListener("resize", function()
	{
		if (GMap)
		{
			GMap.setZoom(8);
			GMap.panTo(GMe.getPosition());
		}
	});
	
	// grab scene div so we can clear it
	var sceneDiv = document.getElementById("scene");
	
	dev.BindToCamera("cameraTransform");
	dev.TrackLocation(function(position)
	{
						  /*
							FetchSensorsRadius({lat: position.coords.latitude, lon: position.coords.longitude}, 100, function(json)
							{
							sceneDiv.innerHTML = "";
							for (var core in json.pois)
							{
							var data = json.pois[core].fw_core;
							var latlon = data.location.wgs84;
							var worldcoord = ConvertToWorldCoordinate({lat: latlon.latitude, lon: latlon.longitude});
							var campos = ConvertToWorldCoordinate({lat:position.coords.latitude, lon:position.coords.longitude});
							
									// set y to 0, this will be the altitude later
										var objpos = {x: worldcoord.x - campos.x, y: 0, z: worldcoord.z - campos.z};
										SensorVizBillboard("scene", "defs", objpos, data.source.name, "icons/romantic.jpg", 50);
									}
								});
								*/

								if (GMe)	
								{
									GMe.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
								}
							});

							// start parsing QR
							qr.AddListener("p", function(pos)
							{
								var msg = document.getElementById("overlay");
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
