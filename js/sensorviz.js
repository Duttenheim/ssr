//------------------------------------------------------------------------------
/**
   Create a new sensor, as a coupling of a 3D representation and a data source
   @param group is the group div (in the xml3d document) in which the objects should appear
   @param updateFrequency is the frequency with which the sensor data should be updated
   @param position is the location of the sensor, in polar {lon, lat, alt} coordinates
*/
function SensorViz(group, updateFrequency, position)
{
	var mesh = document.createElement("mesh");
	mesh.src = "ext/teapot.json";
	var root = document.getElementById(group);

	
	var pos = ConvertToWorldCoordinate(position);
	var str = String.format("translate3D({0}px, {1}px, {2}px)", pos.x, pos.y, pos.z);
	mesh.style.transform = str;

	// add element to root
	root.appendChild(mesh);
}