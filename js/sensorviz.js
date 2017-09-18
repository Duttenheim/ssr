//------------------------------------------------------------------------------
/**
   Create a new sensor, as a coupling of a 3D representation and a data source
   @param group is the group div (in the xml3d document) in which the objects should appear
   @param position is the position of the sensor in cartesian space
   @param ID is the sensor id used to fetch the sensor
   @param updateFrequency is the frequency with which the sensor data should be updated
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
	return mesh;
}

//------------------------------------------------------------------------------
/**
*/
function SetupBillboardShader()
{
	XML3D.materials.register("billboard-material",
							 {
								 vertex: 
"\
attribute vec3 position;\
attribute vec2 texcoord;\
varying vec2 UV;\
\
uniform vec3 translation;\
uniform mat4 modelViewProjectionMatrix;\
uniform vec3 cameraPosition;\
void main()\
{\
gl_Position = modelViewProjectionMatrix * vec4(position, 1);\
UV = texcoord;\
}\
",
								 fragment: 
"\
varying vec2 UV;\
uniform sampler2D billboardTexture;\
\
void main()\
{\
gl_FragColor = texture2D(billboardTexture, UV);\
}\
",
								 
								 uniforms: 
								 {
									 translation: [0,0,0]
								 },
								 
								 samplers:
								 {
									 billboardTexture: null
								 },

								 attributes:
								 {
									 position: {required:true},
									 texcoord: {required:true}
								 }
							 });
}

var ShaderImageMap = new Map();
var GroupImageMap = new Map();
//------------------------------------------------------------------------------
/**
   Create a new sensor, as a coupling of a 3D representation and a data source
   @param group is the group div (in the xml3d document) in which the objects should appear
   @param position is the position of the sensor in cartesian space
   @param ID is the sensor id used to fetch the sensor
   @param icon is the icon used to display the sensor
   @param updateFrequency is the frequency with which the sensor data should be updated
*/
function SensorVizBillboard(group, defs, position, ID, icon, updateFreqneucy)
{
	var mesh = document.createElement("mesh");
	var root = document.getElementById(group);

	var shader = null;
	if (ShaderImageMap.has(icon))
	{
		shader = "#" + ShaderImageMap.get(icon).id;
		root = GroupImageMap.get(icon);
	}
	else
	{
		var defsDiv = document.getElementById("defs");
		var shd = document.createElement("material");
		shd.id = icon + "_shader";
		shd.id = shd.id.replace(".", "-").replace("/", "-");
		shd.setAttribute("model", "urn:xml3d:materials:billboard-material");
		shd.innerHTML = "\
<data src='#defaultPhong'>\
<texture name='billboardTexture' wrapS='repeat' wrapT='repeat'>\
<img src=" + icon + ">\
</img>\
</texture>\
</data>\
";

		var groupDiv = document.createElement("group");
		groupDiv.id = icon + "_group";
		groupDiv.id = groupDiv.id.replace(".", "-").replace("/", "-");
		root.appendChild(groupDiv);
		root = groupDiv;

		// append to definitions table
		defsDiv.appendChild(shd);
		shader = "#" + shd.id;
		groupDiv.setAttribute("material", shader);

		ShaderImageMap.set(icon, shd);
		GroupImageMap.set(icon, groupDiv);
	}

	// mesh is a static quad mesh
	mesh.type = "triangles";
	mesh.src = "#quadMesh";

	var str = "translate3D({0}px, {1}px, {2}px)".format(position.x, position.y, position.z);
	mesh.style.transform = str;
	mesh.style.zindex = 2;

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

	// add onclick event listener
	mesh.addEventListener("mousedown", func);

	// add element to root
	root.appendChild(mesh);
	return mesh;
}