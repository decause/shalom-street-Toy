//Sprite.js

/*
--Handles data storage of what to draw and where.  Mostly used in playArea.js, but if made generic enough,
--could be used in toybox.js as well.
--In the future, could be expanded to work with internal lists of images/components for compound sprites.
--In the future, could work with animations, or be scripted or some stuff like that.
*/


//Sprite is what we'll actually call.
function Sprite(_x, _y, _width, _height, _imageSource) {
	//------------------------------VARIABLES-------------------------------------

	var x = _x || 0;
	var y = _y || 0;
	var width = _width || 128; 
	var height = _height || 128; 
	var image = new Image();
	image.src = _imageSource || "images/error.png";


	//Handles events.  
	var _fireOnLoad = undefined;
	var _ctxForLoad = undefined;
	function onImageLoad(){ 
		if(_fireOnLoad != undefined){  //If there's anything to fire off.
			//Fire off in proper context if you can, otherwise, just use the current context.
			toReturn.loaded = true;
			if(_ctxForLoad) { _fireOnLoad(_ctxForLoad); } else { _fireOnLoad(this); }
		}
	}; image.onload = onImageLoad;


	//-----------------------------PROPERTIES-------------------------------------

	function _setPosition(_x, _y){ x = _x; y = _y; }
	function _setImage(_image) { 
		image = _image; 
		//Add load event. If the image is loaded, fire off the load event.
		image.onload = onImageLoad();
		if(image.complete) {
			onImageLoad();
		}
	}
	function _setLoad(_load, _ctx) { _fireOnLoad = _load; _ctxForLoad = _ctx; }
	function _draw(){ return Array(_getData()); }
	function _getData(){ return {"image":image, "x":x, "y":y, "width":width, "height":height }; }



	//All of our public methods go here.
	//Everything outside of toReturn is private.
	var toReturn = {

		//Public variables.  Internal functions can refer to it through toReturn.loaded.
		"loaded":false,

		//set the x and y coordinates of the sprite.
		/*
		x:number, y:number
		*/
		"setPosition":_setPosition,

		//set the source image of the sprite.
		/*
		image: img
		*/
		"setImage":_setImage,

		//Set a function to be fired off when the sprite has finished loading.
		/*
		function: the function to be called, ctx: the object to set the context to (optional)
		*/
		"setLoad":_setLoad,

		//Returns a list of data objects for drawing. (just itself.)
		"draw":_draw,

		//Returns an object with x, y, width, height, and image of the sprite.
		"getData":_getData,
	}


	return toReturn;
}
