
/**
 * Constructor for a cell at x,y coords, alive is a Boolean to determine state.
 */
function GridCell(map, x, y, alive){

  this.x = x;
  this.y = y;
  this.alive = alive;
  this.map = map;

}

module.exports = GridCell;