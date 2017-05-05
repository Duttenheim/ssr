//------------------------------------------------------------------------------
/**
   Create a mobile device for orientation handling
   @param portrait is the div that should be shown in portrait mode
   @param landscape is the div that should be shown in landscape mode
*/
function Device(portrait, landscape)
{
	this.camera = null;
	this.orientation = new XML3D.Quat();
	this.portrait_div = portrait;
	this.landscape_div = landscape;

	this.orientationcallback = function(event) 
	{ 
		if (Math.abs(window.orientation) == 90)
		{
			document.getElementById(this.portrait_div).style.display = 'none';
			document.getElementById(this.landscape_div).style.display = 'block';
		}
		else
		{
			document.getElementById(this.portrait_div).style.display = 'block';
			document.getElementById(this.landscape_div).style.display = 'none';
								}
	}.bind(this);
	this.orientationcallback();


	var gn = new GyroNorm();
	var args = 
		{
			frequency:50,
			gravityNormalized:true,
			orientationBase:GyroNorm.GAME,
			decimalCount:2,
		};


	this.gn = gn;
	this.gn.init(args).then(function()
						{
							this.gn.start(function(data)
									 {
										 // if no transform is bound to the device, then why do we care?
										 if (this.camera != null && this.gn.isAvailable())
										 {
											 var quat = new XML3D.Quat();
											 quat = new XML3D.Quat().rotateX(data.beta);
											 quat = quat.mul(new XML3D.Quat().rotateY(data.gamma));
											 quat = quat.mul(new XML3D.Quat().rotateZ(data.alpha));
											 var axang = XML3D.AxisAngle.fromQuat(quat);
											 var str = axang.axis.x + " " + axang.axis.y + " " + axang.axis.z + " " + axang.angle;
											 this.camera.setAttribute("rotation", str);

											 //this.camera.rotate(this.orientation);
											 
											 //this.camera.transformInterface.orientation = this.orientation;
										 }
									 }.bind(this));
						}.bind(this));

	// add listener for device orientation, effectively switches to the other 'main' div when rotated
	window.addEventListener("orientationchange", this.orientationcallback);

/*
	this.compasscallback = function(event)
	{
		// if no transform is bound to the device, then why do we care?
		if (this.camera != null)
		{
			// this is just wrong, we need some better way of convering
			this.orientation.z = (event.alpha - 90) * Math.PI / 180;
			this.orientation.x = (event.beta + 90) * Math.PI / 180;
			this.orientation.y = (-event.gamma + 90) * Math.PI / 180;
			//this.orientation.z = event.alpha - 180;
			//this.orientation.x = event.beta;
			//this.orientation.y = -event.gamma;

			//var length = this.orientation.length();
			//this.orientation = this.orientation.normalize();
			var quat = new XML3D.Quat();
			quat = new XML3D.Quat().rotateX(this.orientation.x);
			quat = quat.mul(new XML3D.Quat().rotateY(this.orientation.y));
			quat = quat.mul(new XML3D.Quat().rotateZ(this.orientation.z));
			var axang = XML3D.AxisAngle.fromQuat(quat);
			var str = axang.axis.x + " " + axang.axis.y + " " + axang.axis.z + " " + axang.angle;
			this.camera.setAttribute("rotation", str);

			var deb = document.getElementById("debug");
			deb.innerHTML = str;
			//this.camera.rotate(this.orientation);
			
			//this.camera.transformInterface.orientation = this.orientation;
		}
	}.bind(this);

	if (window.DeviceOrientationEvent)
	{
		window.addEventListener("deviceorientation", this.compasscallback);
	}
	else
	{
		alert("Device does not support orientation measurements!");
	}

	if (window.DeviceMotionEvent)
	{

	}
	else
	{
		alert("Device does not support movement measurements!");
	}
*/
}

//------------------------------------------------------------------------------
/**
   Bind a given transform to the device orientation
   @param id is the div id for the transform element
*/
Device.prototype.BindToCamera = function(id)
{
	var cam = document.getElementById(id);
	this.camera = cam;
	//this.camera = new XML3D.StandardCamera(cam, {mode: "fly"});

	// detach camera since it should be dependent on device orientation
	//this.camera.detach();
}