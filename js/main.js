/* Baddie3 - Assignment */
/*
You should start by uncommenting blocks of code or functions that are needed for the assignment.
Follow the instructions given for each of these blocks.
Assignment-sections start like this:
	// -------------------------------------------
	// ASSIGNMENT

Note that the INSTRUCTION can be to fill a whole BLOCK of code, not just one row.
In some cases you have to fill in some missing parts of code or change parts of it.
It can look like this:
	if(false)
These should be filled out by replacing the boolean false with your code, for example:
	if(x > 10)

Good luck!
*/

(function(){
	'use strict';
	var area = document.getElementById('content'),
			baddie = document.getElementById('baddie1'),
			tileSize = 32,
			gridSize = 10,
			//left = area.offsetLeft,
	    //top  = area.offsetTop,
			posLeft = 0,
			posTop = 0,


	/**
	 * This is the game area with a 10x10 grid
	 * 10 - nothing (grass)
	 * 11 - wall (impassible)
	 * 12 - box (movable)
	 * 13 - door (passible)
	 */
	// ------------------------------
	// ASSIGNMENT
	// Fill out the array gameArea so that the whole content is filled with tiles
	// Place out walls, a door and at least 1 box
	// NOTE: The array size is gridSize*gridSize (gridSize 10 gives an array of 100)
	gameArea = [
	11,11,11,11,11,11,11,11,11,11,
	11,10,10,10,10,10,10,10,10,11,
	11,10,10,10,10,10,10,10,10,11,
	11,10,10,10,10,10,10,10,10,11,
	11,10,10,10,10,10,10,10,10,11,
	11,10,10,10,10,10,10,10,10,11,
	11,10,10,12,10,10,10,10,10,13,
	11,10,10,10,10,10,10,10,10,11,
	11,10,10,10,10,10,10,10,10,11,
	11,11,11,11,11,11,11,11,11,11,
	/*Fill out the rest of the array*/
];


	/**
	* Draw the initial gameplan
	*/
	function drawGamePlan(gameArea) {
    var i,e;
    for (i = 0; i < gameArea.length; i++) {
      e = document.createElement('div');
      e.innerHTML = '';
      e.className = 'tile t' + gameArea[i];
      e.id = 'n' + i;
      area.appendChild(e);
    }
  }
  console.log('Drawing gameplan.');
  drawGamePlan(gameArea);

  /**
   * Move character
   * TODO: add "which" to tell sprite the current direction
   */
  var move = function(moveLeft, moveTop){

  	function moveIt(){
  		baddie.style.left = (area.offsetLeft + posLeft*tileSize) + 'px';//(area.offsetLeft + posLeft*tileSize + tileSize/2) + 'px';
      	baddie.style.top  = (area.offsetTop + posTop*tileSize) + 'px';
  		console.log(area.offsetLeft + ' top ' + area.offsetTop);
  	}

  	if ((gameArea[(posLeft+moveLeft)+(posTop+moveTop)*gridSize]-10) === 0) {
      posLeft += moveLeft;
      posTop  += moveTop;
      moveIt();
    }
    else {console.log('coolt!!');}
  }; // end of moveIt
  move (1, 1);
  document.onkeydown = function(event){
    var key;

    key = event.keyCode || event.which;
   	console.log('Moving' + event.keyCode);
  	switch (key)
  	{
	    case 37: if (isBaddieMovable(-1, 0)) {
	               move(-1, 0);
								 document.getElementById('baddie1').className = "baddie-left";
	            }
	            break;

	    case 39: if (isBaddieMovable(1, 0)) {
	               move(1, 0);
								 event.preventDefault();
								 document.getElementById('baddie1').className = "baddie";
	            }
	            break;

	    case 38:   if (isBaddieMovable(0, -1)) {
	              move(0, -1);
	            }
	            break;

	    case 40: if (isBaddieMovable(0, 1)) {
	               	move(0, 1);
									event.preventDefault();
	            }
	            break;

	    default: move(0, 0); break;
	} // end of switch
	console.log('Keypress: ' + event + ' key: ' + key + ' new pos: ' + baddie.offsetLeft + ', ' + baddie.offsetTop);
  }; // end of onkeydown


	var isBaddieMovable = function(moveLeft, moveTop){
		var tile, tilePos, newLeft, newTop, movable;
		// This time we want the grid position values, not the pixel position values
		newLeft = posLeft + moveLeft;
		newTop = posTop + moveTop;

		movable = false;

		// Get the tile baddie wants to move to
		// left is the row number and top is the column number
		tilePos = newLeft + newTop*gridSize;

		// ------------------------------
		// ASSIGNMENT
		// Get the tile value from array gameArea and place it in the variable tile

		tile = gameArea[tilePos];
		console.log("Move to: " + newLeft + "," + newTop);
		console.log("Tile " + tilePos + " contains " + gameArea[tilePos]);

		// Switch case on the tile value - do different things depending on what tile baddie is moving to
		switch(tile) {
			case 10: // empty
			case 13: // door
				// Move baddie to tile
				movable = true;
				break;
			case 11:
				// Wall, don't move baddie
				console.log("Baddie collided with wall: %s", tile);
				break;
			case 12:
				// Tile was a box, move it and then baddie
				var nextPos, nextTile;

				// Calculate where the sibling tile to be checked is in the array
				nextPos = tilePos + moveLeft + (gridSize*moveTop);

				// ------------------------------
				// ASSIGNMENT
				// Get the next tile from gameArea and place it in the variable nextTile (5b)

				nextTile = gameArea[nextPos];
				console.log("The next tile is: " + nextTile);

				// Only move if the sibling tile to be moved to is empty
				if(nextTile == 10) {
					moveTile(tilePos, nextPos);
					// Allow  baddie to move to the current tile
					movable = true;
					console.log("Moved a box");
				} else {
					// if not empty - don't do anything else
					console.log("Can't push box - next tile is not empty");
				}
				break;
			default:
				// Tile was impassible - collided, do not move baddie
				console.log("Oh no, baddie collided with the wall");
				movable = false;
		}
		return movable;
	};

	var moveTile = function(current, next) {
	var tile = gameArea[current];
	// ------------------------------
	// ASSIGNMENT
	// Switch the tiles
	// Place tile into the next positon in the array gameArea
	// Then make sure the current tile is empty in the array gameArea

	gameArea[next] = tile;
	gameArea[current] = 10;

	// Give the tiles new classnames to redraw them
	document.getElementById("n" + next).className = "tile t" + tile; // box tile here
	document.getElementById("n" + current).className = "tile t" + 10; // current tile will be empty
};



})();
