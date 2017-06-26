var zxing =	null;

//------------------------------------------------------------------------------
/**
   Class: QR
   Implements a QR code reader which can parse a QR code, and depending on the type of QR code, run a specific function
   @param video is the name of the <video> used to render the video to
*/
function QR(video)
{
	this.listeners = new Map();
	this.internalImage = null;
	this.internalDecode = null;

	zxing =	ZXing();
	var decodeFunction = function(ptr, len, resultIndex, resultCount)
	{
		var result = new Uint8Array(zxing.HEAPU8.buffer, ptr, len);
		var str = String.fromCharCode.apply(null, result);
		
		var pieces = str.split(";");
		var clb = this.listeners.get(pieces[0]);
		if (clb != null)
		{
			clb(pieces.slice(1));
		}
		else
		{
			throw "No callback for identifier '" + pieces[0] + "'";
		}
		
	}.bind(this);
	this.internalDecode = zxing.Runtime.addFunction(decodeFunction);
	
	// setup from video div, and do an initial resize
	this.video = document.getElementById(video);

	//window.addEventListener("resize", function() { this.internalImage = this.zxing._resize(this.video.videoWidth, this.video.videoHeight); }.bind(this));
}

//------------------------------------------------------------------------------
/**
   Register listener, which runs a callback depending on the leading character in the QR code
   @param id is the identifying string for this callback
   @param callback is the function to call whenever a type of QR code is encountered, the callback will be called with an array of the arguments
*/
QR.prototype.AddListener = function(id, callback)
{
	this.listeners.set(id, callback);
}

//------------------------------------------------------------------------------
/**
   Process an image for QR codes
   @param buffer is an Uint8ClampedArray of RGBA colors used to detect the QR code
*/
QR.prototype.Update = function(buffer)
{
	if (this.internalDecode)
	{
		// resize if needed
		if (!this.internalImage)
		{
			this.internalImage = zxing._resize(this.video.videoWidth, this.video.videoHeight);
			return;
		}

		// use rgb to monochrome by taking the clamped average
		let data = buffer.data;
		for (var i = 0, j = 0; j < data.length; i++, j+=4)
		{
			let [r, g, b] = [data[j], data[j+1], data[j+2]];
			zxing.HEAPU8[this.internalImage + i] = Math.trunc((r+g+b)/3);
		}
		
		// decode, errors are just ignored
		var err = zxing._decode_qr(this.internalDecode);
	}
}