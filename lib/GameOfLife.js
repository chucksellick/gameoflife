var GameGrid = require('./GameGrid');
var _ = require('lodash');

/** Constructor */
function GameOfLife(){
  this.grid = new GameGrid();
}

GameOfLife.prototype.cell = function(x,y){
  return this.grid.get(x,y);
}

GameOfLife.prototype.cells = function(){
  var cells = [];
  for (y=0;y<this.height;y++) {
    row = [];
    for (x=0;x<this.width;x++){
      row.push(this.cell(x,y));
    }
    cells.push(row);
  }
  return cells;
}

GameOfLife.prototype.setSize = function(width,height){
  this.width = width;
  this.height = height;
  this.grid.initialize(width,height);
}

/**
 * Produce the next iteration
 */
GameOfLife.prototype.iterate = function(){
  var x,y;

  // Precalculate neighbour count for all cells so subsequent changes don't distort the rules
  var lastNeighbours = [];
  for (y=0;y<this.height;y++) {
    lastNeighbours[y] = [];
    for (x=0;x<this.width;x++) {
      // Get neighbours from the cell
      var cell = this.grid.get(x,y);
      var neighbours = cell.neighbours();
      lastNeighbours[y][x] = neighbours;
    }
  }
  
  for (x=0;x<this.width;x++) {
    for (y=0;y<this.height;y++) {
      // Get neighbours from the cell
      var cell = this.cell(x,y);
      var neighbours = lastNeighbours[y][x];
      var alive = cell.alive;
      // Apply rules
      if (alive) {
        // Die less than 2 or greater than 3 neighbours
        if(neighbours < 2 || neighbours > 3) {
          alive = false;
        }
      } else {
        // Reproduce with exactly 3 neighbours
        if (neighbours === 3) {
          alive = true;
        }
      }
      // Store value in grid
      if (alive !== cell.alive) {
        cell.set(alive);
      }
    }
  }
}

/**
 * Static constructor from a map array of 0's and 1's
 */
GameOfLife.fromMap = function(map) {
  var game = new GameOfLife();
  // TODO: Check whole map is valid, i.e. every row the same length, throw an error if not
  game.setSize(map.length,map[0].length);
  for (y=0;y<map.length;y++) {
    var row = map[y];
    for (x=0;x<row.length;x++) {
      game.cell(x,y).alive = (row[x]==='1' ? true : false);
    }
  }
  return game;
}

GameOfLife.fromSize = function(width,height) {
  var game = new GameOfLife();
  game.setSize(width, height);
  return game;
}

module.exports = GameOfLife;
