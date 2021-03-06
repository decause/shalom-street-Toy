//characterSkeleton.js
/*
Author: Nick Buonarota
Email: nickbuonarota@mail.rit.edu
Date Created: 6/2/2014
*/

/*
Summary: Intended to be a holder of sprites or components for a "character" 
in our app. Similar to the Diablo 3 system of character gear. For example, 
your character has a slot for a "hat", a slot for "boots", and so on.
*/

function CharacterSkeleton(_x, _y, _width, _height){
	//------------------------------VARIABLES-------------------------------------
	var base = Module(_x, _y, _width, _height); //Call base
	var toReturn = base.interface; //Set toReturn via base.
	toReturn.setSlot = _setSlot;
	toReturn.type = "CharacterSkeleton";


	toReturn.draw = _draw; //Modify public interface.
	toReturn.setBodyType = _setBodyType;
	toReturn.setSlotColor = _setSlotColor;
	

	//order means draw order
	//0 gets drawn first
	var _slots = {
		//template
		"background": 		{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":1},
		"head": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":3},
		"hands":			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":15},
		//head
		"face": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":8},
		"hair": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":9},
		"mask": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":10},
		//suit
		"jumpsuit": 		{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":2},
		"cape": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":0},
		"boots": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":13},
		//shirt
		"shirt": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":4},
		"jacket": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":7},
		"logo": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":6},
		//pants
		"pants": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":5},
		"belt": 			{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":14},
		"pants_accessory": 	{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":12},
		//accessories
		"arm_guards": 		{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":16},
		"shin_guards": 		{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":17},
		"hoods_and_helmets":{"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":11},
		
		//unused
		"body": {"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":99},
		"butt": {"x":0, "y":0, "width":640, "height":864, "sprite":undefined, "order":69},
	}
	toReturn.slots = _slots;
	
	
	//---------------------------FUNCTIONS---------------------------------------
	function _draw(){

		var toDraw = [];

		//Recursively get all sprite data to draw.
		for(var i=0; i<base.contents.length; i++){
			toDraw = toDraw.concat(base.contents[i].draw());
		}

		//Set offsets.
		for(i=0; i<toDraw.length; i++){
			toDraw[i].x += toReturn.bounds.x;
			toDraw[i].y += toReturn.bounds.y;
		}

		return toDraw;

		//Temp Dev Test
		// Red rectangle
		//--------ctx is not a variable that normally would be available here--------
		//--------Comment this out outside of testing environment-----------------------
		ctx.beginPath();
		ctx.lineWidth="10";
		ctx.strokeStyle="red";
		ctx.rect(toReturn.bounds.x, toReturn.bounds.y, toReturn.bounds.width, toReturn.bounds.height);
		ctx.stroke();
		//------------------End testing environment code--------------------------------
		//------------------------------------------------------------------------------

		return toDraw;
	}
	
	function _addSlot(toAdd, _x, _y, _width, _height, _order){
		_slots[toAdd] = {"x":_x || 0, "y": _y || 0, "width":_width || 128, "height":_height || 128, "order": _order || 0 }
	}
	function _removeSlot(toRemove){
		delete _slots[toAdd];
	}

	function _setSlotColor(slot, r, g, b){
		if(toReturn.slots[slot] && toReturn.slots[slot].sprite) {
			toReturn.slots[slot].sprite.setColor(r, g, b, true);
		}
	}


	//Set the body type for this characterSkeleton.
	function _setBodyType(bodyType){
		//
		for(var s in _slots) {
			if(_slots[s].sprite) { //If the slot is filled.
				//Swap it.
				_slots[s].sprite.setBodyType(bodyType);
			}
		}

	}
	


	function _setSlot(slot, sprite, bodyType){

		//If you were passed in an image.
		if(typeof(sprite) == "string") {
			//Some error checking, we could be doing more here.
			if(toReturn.slots[slot]) {
				toReturn.slots[slot].sprite.setImage(sprite);
				//Change the color of the new slot.
				//Code would go here if this was ever being called.
				/*
				toReturn.slots[slot].sprite.setColor(toReturn.slots[slot].sprite.currentColor[0], 
														toReturn.slots[slot].sprite.currentColor[1], 
														toReturn.slots[slot].sprite.currentColor[2], 
													false);
				*/
			}
		//Otherwise.
		} else {
			//Remove the past contents of the slot if it exists.
			if(toReturn.slots[slot]) {
				base.removeModule(toReturn.slots[slot].sprite);
			}//

			//Added.
			base.addModule(sprite, toReturn.slots[slot].order);
			toReturn.slots[slot].sprite = sprite;

			//Sort the slots.
			//Little bit hacky.  We can do this better.
			var tempArray = []
			for(var s in _slots) {
				if(_slots[s].sprite != undefined) {
					tempArray.push(_slots[s]);
				}
			}
			tempArray.sort(function(a, b){ return a.order > b.order; })
			for(var s in tempArray){
				if(base.removeModule(tempArray[s].sprite)){ //If you could remove the slot, re-add it in the correct place.
						base.addModule(tempArray[s].sprite, tempArray[s].order);
				}
			}
			
			/*
			if(base.removeModule(toReturn.slots[s].sprite)){ //If you could remove the slot, re-add it in the correct place.
						base.addModule(toReturn.slots[s].sprite,toReturn.slots[s].order);
					}
					*/

			
			toReturn.slots[slot].sprite.setBodyType(bodyType || "default");
			sprite.bounds.x = toReturn.slots[slot].x;
			sprite.bounds.y = toReturn.slots[slot].y;
			
			//sprite.bounds.width = toReturn.slots[slot].width;
			//sprite.bounds.height = toReturn.slots[slot].height;
		}
	}

	/*
	function: 	_updateComponent
	parameters:	_componentType: type of component that is passed in. IE: baseball cap is has a _componentType of "hat"
				_component: what the component is. IE: "baseball cap"
	description: This function takes a passed in component and overrides the old component in that slot with the new one.
	returns: N/A
	*/
	function _updateComponent(_componentType, _component)
	{
		if(slots._componentType) {
			//Set the new sprite
			slots._componentType.sprite = _component;
			//Make sure that the sprite's x and y are at the spot for this componentType
			slots._componentType.sprite.bounds.x = _componentType.x;
			slots._componentType.sprite.bounds.y = _componentType.y;
		}
		
	}

	return toReturn;
}