//------------------------------------------------------------------------------
/**
   Class: Device
   Create a mobile device for orientation handling
   @param portrait is the div that should be shown in portrait mode
   @param landscape is the div that should be shown in landscape mode
*/
function Device(portrait, landscape)
{
	this.camera = null;
	this.position = [0, 0, 0];
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
			orientationBase:GyroNorm.WORLD,
			decimalCount:2,
			screenAdjusted: false
		};

	this.gn = gn;
	this.gn.init(args).then(function()
						{
							this.gn.start(function(data)
									 {
										 //this.gn.setHeadDirection();
										 // if no transform is bound to the device, then why do we care?
										 if (this.camera != null)
										 {
											 if (this.gn.isAvailable(GyroNorm.DEVICE_ORIENTATION))
											 {
												 var quatval = ConvertOrientationToQuaternion(data.do.alpha, data.do.beta, data.do.gamma);
												 var quat = new XML3D.Quat(quatval[0], quatval[1], quatval[2], quatval[3]);
												 quat = quat.normalize();

												 // rotate so that Z is actually Z
												 var rot = new XML3D.Quat().rotateX(-Math.PI/2);
												 quat = rot.mul(quat);
												 quat = quat.normalize();
												 
												 var axang = XML3D.AxisAngle.fromQuat(quat);
												 var str = "{0} {1} {2} {3}".format(axang.axis.x, axang.axis.y, axang.axis.z, axang.angle);
												 var debug = document.getElementById("debug");
												 //debug.innerHTML = "{0} {1} {2}".format(data.do.alpha, data.do.beta, data.do.gamma);
												 debug.innerHTML = str;
												 this.camera.setAttribute("rotation", str);
												 //this.camera.innerHTML = str;
											 }
											 if (this.gn.isAvailable(GyroNorm.DEVICE_MOTION))
											 {
												 this.position[0] += data.dm.x;
												 this.position[1] += data.dm.y;
												 this.position[2] += data.dm.z;
												 var str = "{0} {1} {2}".format(this.position[0], this.position[1], this.position[2]);
												 //var debug = document.getElementById("debug");
												 //debug.innerHTML = str;
												 
												 this.camera.setAttribute("translation", str);
											 }
										 }
									 }.bind(this));
							this.gn.setHeadDirection();
						}.bind(this));


	// add listener for device orientation, effectively switches to the other 'main' div when rotated
	window.addEventListener("orientationchange", this.orientationcallback);
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
}

//------------------------------------------------------------------------------
/**
   Start tracking position
   @param callback is a function which is periodically called whenever the geolocation service returns a new position
*/
Device.prototype.TrackLocation = function(callback)
{
	// only do if we have geolocation
	if (navigator.geolocation)
	{
		navigator.geolocation.watchPosition(callback);
	}
}
