//------------------------------------------------------------------------------
/**
   Convert from coordinate represented in polar coordinates {lon, lat, alt} to cartesian
   @param coordinate as object of type {lon, lat, alt}, corresponding to Longitude, Latitude, Altitude respectively
   @return object of 3 values, corressponding to {x, y, z}
*/
function ConvertToWorldCoordinate(coordinate)
{
	const var rad = 6371;
	pos = {x: rad * Math.cos(position.lat) * Math.cos(position.lon),
		   y: 	rad * Math.cos(position.lat) * Math.sin(position.lon),
		   z:	rad * Math.sin(position.lat)]};
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