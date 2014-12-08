var GridCell = require('./GridCell')
  , _ = require('lodash');

/**
 * Defines the grid on which cells live
 */
function GameGrid(map){
  this.map = map;
}

GameGrid.prototype.initialize = function(width, height) {
  this.map = [];
  this.width = width;
  this.height = height;
  for (var y=0; y<height; y++) {
    var row = [];
    for (var x=0; x<width; x++) {
      row.push(new GridCell(this,x,y,false));
    }
    this.map.push(row);
  }
}

/**
 * Gets a GridCell object for an x,y coordinate
 */
GameGrid.prototype.get = function(x,y) {
  if (typeof this.map[y] === 'undefined' || typeof this.map[y][x] === 'undefined')
    return undefined;

  return this.map[y][x];
}

/**
 * Set a cell in the grid
 * 
 * Would be interesting to make all ops non-destructive by returning a new map
 * with just the changed cell, not very performant but extremely flexible.
 */
GameGrid.prototype.set = function(x,y,alive) {
  this.map[y][x].alive = alive;
}

module.exports = GameGrid;
