//var url = "http://130.240.134.126:1026/v1/queryContext";
var url = "https://staff.www.ltu.se/~gusste/proxy.php";

//------------------------------------------------------------------------------
/**
   Fetch sensors by radius and polar latitude+longitude coordinates
   @param location is the latitude and longitude position of the search area
   @param radius is the radial distance from the point defined by location
*/
function FetchSensorsRadius(location, radius)
{
	// this requires the POI service and a URL to it...!!!!!!one
}

//------------------------------------------------------------------------------
/**
   Brute force method which fetches ALL sensors
*/
function FetchAllSensors()
{
	var json = { entities: [{id: " *", type:"sensor", isPattern:"true"}], attributes: []};
	SendToFiWare(json, function(e)
				 {
					 alert(e);
				 });
}

//------------------------------------------------------------------------------
/**
   Fetches a single sensor
   @param id is the name of the sensor
   @param attributes is a list of strings which represents the values to fetch
*/
function FetchSensor(id, attributes)
{
	var json = { entities: [{id: id, type:"sensor", isPattern:"false"}], attributes: attributes};

	SendToFiWare(json, function(e)
				 {
					 alert(e);
				 });
}

//------------------------------------------------------------------------------
/**
   Fetches a bunch of sensors
   @param ids is an array of sensors to fetch
   @param attributes is a list of strings which represents the values to fetch
*/
function FetchSensors(ids, attributes)
{
	var entities = [];
	for (var i = 0; i < ids.length; i++)
	{
		entities.append({id: ids[i], type:"sensor", isPattern:"false"});
	}
	var json = { entities: entities, attributes: attributes};

	SendToFiWare(json, function(e)
				 {
					 alert(e);
				 });
}


//------------------------------------------------------------------------------
/**
   Serializes JSON object to string and sends to FiWare, runs callback with response text.
   @param json is the JSON object to send to FiWare.
   @param callback is a function taking a string as input, which is the response text from the server.
*/
function SendToFiWare(json, callback)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(e)
	{
		if (this.readyState == 4 && this.status == 200)
		{
			callback(this.responseText);
		}
	}
	req.open("POST", url, true);
	req.send(JSON.stringify(json));
}