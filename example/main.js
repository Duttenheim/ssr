
window.addEventListener("load", function()
{
	// setup shader for billboard rendering
	SetupBillboardShader();

	// LORA_Sensor
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 0.703, z: 4.1055}, "EnvironmentalSensor_S2", "sensor", "../icons/romantic.jpg", 50);

	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 0.703, z: 2.8885}, "EnvironmentalSensor_S2", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 1.576, z: 2.8885}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 0.703, z: 2.1025}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 1.576, z: 2.1025}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 0.703, z: 1.3125}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 1.576, z: 1.3125}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);

	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 0.703, z: 0.1925}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 1.576, z: 0.1925}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 0.703, z: -0.6505}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 1.576, z: -0.6505}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 0.703, z: -1.5525}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.8015, y: 1.576, z: -1.5525}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);

	SensorVizBillboard("scene", "defs", {x: -2.756, y: 0, z: -4.1055}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -1.6255, y: 0, z: -4.1055}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -0.4635, y: 0, z: -4.1055}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: 0.7565, y: 0, z: -4.1055}, "EnvironmentalSensor_S3", "sensor", "../icons/romantic.jpg", 50);

	
	CameraStartup("video-select", "video", function(err) {alert(err);});

	var qr = new QR("video")
	InitiateCapture(function(data) { qr.Update(data); }, 1000);
	
	var dev = new Device("camera-mode", "map-mode", function() { StartCapture(); }, function() { StopCapture(); });
	
	// grab scene div so we can clear it
	var sceneDiv = document.getElementById("scene");
	
	dev.BindToCamera("cameraTransform");
	dev.TrackLocation(function(position)
	{
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
});
