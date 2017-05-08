//------------------------------------------------------------------------------
/**
   Create a new sensor, as a coupling of a 3D representation and a data source
   @param group is the group div (in the xml3d document) in which the objects should appear
   @param updateFrequency is the frequency with which the sensor data should be updated
   @param position is the position of the sensor in cartesian space
   @param ID is the sensor id used to fetch the sensor
*/
function SensorViz(group, position, ID, updateFrequency)
{
	var mesh = document.createElement("mesh");
	mesh.src = "ext/teapot.json";
	var root = document.getElementById(group);

	var str = "translate3D({0}px, {1}px, {2}px)".format(position.x, position.y, position.z);
	mesh.style.transform = str;

	var func = function(event)
	{
		var sensorDiv = document.getElementById("sensor");
		FetchSensor(ID, [], function(json)
					{

						var sens = json.contextResponses[0].contextElement.attributes;
						var str = "";
						for (var i = 0; i < sens.length; i++)
						{
							str += "{0} = {1}<br>".format(sens[i].name, sens[i].value);
						}						
						sensorDiv.innerHTML = str;
					});
	}.bind(this);

	mesh.addEventListener("mousedown", func);
//	mesh.onmouseover = OnSensorClicked;

	// add element to root
	root.appendChild(mesh);
}

function bleh(event)
{
	alert("everyday im hovering...");
}