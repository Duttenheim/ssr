//------------------------------------------------------------------------------
/**
   Convert from coordinate represented in polar coordinates {lon, lat, alt} to cartesian
   @param coordinate as object of type {lon, lat, alt}, corresponding to Longitude, Latitude, Altitude respectively
   @return object of 3 values, corressponding to {x, y, z}
*/
function ConvertToWorldCoordinate(coordinate)
{
	const rad = 6371;
	pos = {x: rad * Math.cos(coordinate.lat) * Math.cos(coordinate.lon),
		   y: 	rad * Math.cos(coordinate.lat) * Math.sin(coordinate.lon),
		   z:	rad * Math.sin(coordinate.lat)};
	return pos;
}

//------------------------------------------------------------------------------
/**
   Implement string formatting
*/
if (!String.prototype.format)
{
	String.prototype.format = function()
	{
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number)
							{ 
								return typeof args[number] != 'undefined'
									? args[number]
									: match
								;
							});
	};
}

//------------------------------------------------------------------------------
/**
   From https://w3c.github.io/deviceorientation/spec-source-orientation.html
   Convert a devices alpha-beta-gamma orientation to a quaternion which is useful for 3D.
   @param alpha is the device's alpha angle
   @param beta is the device's beta angle
   @param gamma is the device's gamma angle
*/
function ConvertOrientationToQuaternion(alpha, beta, gamma)
{
	const degtorad = Math.PI / 180;

	var _x = beta  * degtorad;
	var _y = gamma * degtorad;
	var _z = alpha * degtorad;

	var cX = Math.cos( _x/2 );
	var cY = Math.cos( _y/2 );
	var cZ = Math.cos( _z/2 );
	var sX = Math.sin( _x/2 );
	var sY = Math.sin( _y/2 );
	var sZ = Math.sin( _z/2 );

  //
  // ZXY quaternion construction.
  //

	var w = cX * cY * cZ - sX * sY * sZ;
	var x = sX * cY * cZ - cX * sY * sZ;
	var y = cX * sY * cZ + sX * cY * sZ;
	var z = cX * cY * sZ + sX * sY * cZ;

	return [ x, y, z, w ];
}