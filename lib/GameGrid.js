var GridCell = require('./GridCell')
  , _ = require('lodash');

/**
 * Defines the grid on which cells live
 */
function GameGrid(map){
  this.map = map;
}

/**
 * Gets a GridCell object for an x,y coordinate
 */
GameGrid.prototype.get = function(x,y) {
  if (typeof this.map[y] === 'undefined' || typeof this.map[y][x] === 'undefined')
    return undefined;

  var val = this.map[y][x];
  return new GridCell(this, x, y, (val==='1'));
}
/**
 * Set a cell in the grid
 * 
 * Would be interesting to make all ops non-destructive by returning a new map
 * with just the changed cell, not very performant but extremely flexible.
 */
GameGrid.prototype.set = function(x,y,alive) {
  var split = this.map[y].split('');
  split[x] = alive ? '1' : '0';
  this.map[y] = split.join('');
}

/**
 * Clone this map
 */
GameGrid.prototype.clone = function() {
  return new GameGrid(_.clone(this.map)); // Shallow clone is fine since it's a string map
}

/**
 * Constructor to create an empty game grid of specific width and height
 */
 /*
GameGrid.ofSize = function(x,y) {

}
*/
module.exports = GameGrid;
