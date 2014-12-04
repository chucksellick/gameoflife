var GameGrid = require('./GameGrid');
var _ = require('lodash');

/** Constructor */
function GameOfLife(){
  this.grids = { 
    current:null,
    previous:null
  };
  this.rules = {
    minSurvive: 2,
    maxSurvive: 3,
    minReproduce: 4,
    maxReproduce: 8
  };
}

/**
 * Sets the current grid, and pushes the last iteration back into grids.previous
 */
GameOfLife.prototype.setCurrent = function(grid) {
  this.grids.previous = this.grids.current;
  this.grids.current = grid;
}

GameOfLife.prototype.cell = function(x,y){
  return this.grids.current.get(x,y);
}

/**
 * Produce the next iteration
 */
GameOfLife.prototype.iterate = function(){
  var x,y;
  
  // Clone a new grid
  this.setCurrent(this.grids.current.clone());

  for (x=0;x<this.width;x++) {
    for (y=0;y<this.height;y++) {
      // Get neighbours from the cell
      var cell = this.grids.previous.get(x,y);
      var neighbours = cell.neighbours();
      var alive = cell.alive;
      // Apply rules
      if (alive && (neighbours < this.rules.minSurvive || neighbours > this.rules.maxSurvive)) {
        alive = false;
      }
      else if (!alive && (neighbours >= this.rules.minReproduce && neighbours <= this.rules.maxReproduce)) {
        alive = true;
      }
      // Store value in grid
      this.grids.current.set(x,y,alive);
    }
  }
}

/**
 * Static constructor from a map array of 0's and 1's
 */
GameOfLife.fromMap = function(map) {
  var game = new GameOfLife();
  game.setCurrent(new GameGrid(map));
  // TODO: Check whole map is valid, i.e. every row the same length, throw an error if not
  game.height = map.length;
  game.width = map[0].length;
  return game;
}

module.exports = GameOfLife;