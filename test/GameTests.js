/**
 * Test the game engine is functioning correctly
 */

var chai = require('chai')
  , should = chai.should()
  , expect = chai.expect
  , engine = require('../lib/GameOfLife')
  , GameGrid = require('../lib/GameGrid')
  , _ = require('lodash');

describe('Grids', function(){
  describe('Initialization', function(){

    it('Should create a grid from an array and query some cells', function(){
      var grid = new GameGrid(['000','010','000']);
      var cell0 = grid.get(0,0);
      cell0.alive.should.equal(false);
      cell0.neighbours().should.equal(1);
      var cell1 = grid.get(1,1);
      cell1.alive.should.equal(true);
      cell1.neighbours().should.equal(0);
    })

  });
});

describe('Game engine', function(){

  describe('Initialization', function(){
    it ('Should create a game from a map', function(){
      var game = engine.fromMap(['0']);
      _.isArray(game.grids.current.map).should.equal(true);
      game.width.should.equal(1);
      game.height.should.equal(1);
    });
  });

  describe('Default rules', function(){

    it('Should do nothing with no cells', function(){
      // Create a map
      var game = engine.fromMap([
        '000',
        '000',
        '000'
      ]);
      game.iterate();
      game.cell(0,0).alive.should.equal.false;
      game.grids.current.map.should.deep.equal(['000','000','000']);
    });

    it('Should kill a cell with no neighbours', function(){
      // Create a map
      var game = engine.fromMap([
        '000',
        '010',
        '000'
      ]);
      game.iterate();
      game.cell(0,0).alive.should.equal.false;
      game.grids.current.map.should.deep.equal(['000','000','000']);
    });

    it('Should kill a cell with (?) neighbours', function(){
      // Create a map
      var game = engine.fromMap([
        '010',
        '111',
        '010'
      ]);
      game.iterate();
      game.cell(1,1).alive.should.equal.false;
      game.grids.current.map.should.deep.equal(['010','101','010']);
    });

  });

});