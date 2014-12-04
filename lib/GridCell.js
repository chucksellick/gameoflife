
/**
 * Constructor for a cell at x,y coords, alive is a Boolean to determine state.
 */
function GridCell(grid, x, y, alive){

  this.x = x;
  this.y = y;
  this.alive = alive;
  this.grid = grid;

}

GridCell.prototype.neighbours = function(){
  var count = 0;
  var x,y;
  for (x=-1; x<2; x++){
    for (y=-1; y<2; y++){
      if (x===0 && y===0) {
        continue;
      }
      var cell = this.grid.get(this.x + x,this.y + y);
      if (typeof cell === 'undefined') {
        continue;
      }
      count = count + (cell.alive ? 1 : 0);
    }
  }
  return count;
}

module.exports = GridCell;