
window.addEventListener("load", function()
{
	// setup shader for billboard rendering
	SetupBillboardShader();

	// Setup sensors in Idé-labbet
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 0.703, z: 3.578}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe0309f9", "LORA_Sensor", "../icons/romantic.jpg", 50);

	SensorVizBillboard("scene", "defs", {x: -3.736, y: 0.703, z: 2.439}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe031a81", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 1.5, z: 2.439}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe03117e", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 0.703, z: 1.759}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe03116a", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 1.5, z: 1.759}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe031185", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 0.703, z: 1.015}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe031a80", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 1.5, z: 1.015}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe030513", "LORA_Sensor", "../icons/romantic.jpg", 50);

	SensorVizBillboard("scene", "defs", {x: -3.736, y: 0.703, z: -0.182}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe031a83", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 1.5, z: -0.182}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe031866", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 0.703, z: -0.986}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe031865", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 1.5, z: -0.986}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe0313bE", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 0.703, z: -1.639}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe031a79", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -3.736, y: 1.5, z: -1.639}, {x: 0, y: 1, z: 0, deg: 90}, 	"a81758fffe031bd7", "LORA_Sensor", "../icons/romantic.jpg", 50);

	SensorVizBillboard("scene", "defs", {x: -2.298, y: 0, z: -4.309}, {x: 0, y: 0, z: 0, deg: 0}, 		"a81758fffe030511", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: -1.183, y: 0, z: -4.309}, {x: 0, y: 0, z: 0, deg: 0}, 		"a81758fffe0309c3", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: 0, y: 0, z: -4.309}, {x: 0, y: 0, z: 0, deg: 0},	 	"a81758fffe030a05", "LORA_Sensor", "../icons/romantic.jpg", 50);
	SensorVizBillboard("scene", "defs", {x: 1.324, y: 0, z: -4.309}, {x: 0, y: 0, z: 0, deg: 0}, "EnvironmentalLORA_Sensor_S3", "LORA_Sensor", "../icons/romantic.jpg", 50);

	
	CameraStartup("video-select", "video", function(err) {alert(err);});

	var qr = new QR("video")
	InitiateCapture(function(data) { qr.Update(data); }, 5000);
	
	var dev = new Device("camera-mode", "map-mode", function() { /*StartCapture();*/ }, function() { /*StopCapture();*/ });
	
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
