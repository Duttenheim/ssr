
var FullScreenEnable = null;
var FullScreenDisable = null;
var Root = null;
var IsFullscreen = false;

//------------------------------------------------------------------------------
/**
   Initiate Fullscreen context
*/
function InitiateFullscreen()
{
	Root = document.documentElement;
	if (Root.requestFullscreen)
	{
		FullScreenEnable = "requestFullscreen";
		FullScreenDisable = "exitFullscreen";
	}
	else if (Root.webkitRequestFullscreen)
	{
		FullScreenEnable = "webkitRequestFullscreen";
		FullScreenDisable = "webkitExitFullscreen";
	}
	else if (Root.webkitRequestFullScreen)
	{
		FullScreenEnable = "webkitRequestFullScreen";
		FullScreenDisable = "webkitExitFullScreen";
	}
	else if (Root.mozRequestFullScreen)
	{
		FullScreenEnable = "mozRequestFullScreen";
		FullScreenDisable = "mozExitFullScreen";
	}
	else if (Root.msRequestFullscreen)
	{
		FullScreenEnable = "msRequestFullscreen";
		FullScreenDisable = "msExitFullscreen";
	}
}

//------------------------------------------------------------------------------
/**
*/
function ToggleFullscreen()
{
	if (IsFullscreen)
	{
		Root[FullScreenDisable]();
	}
	else
	{
		Root[FullScreenEnable]();
	}
	IsFullscreen = !IsFullscreen;
}