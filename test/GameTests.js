/**
 * Test the game engine is functioning correctly
 */

var chai = require('chai')
  , should = chai.should()
  , expect = chai.expect
  , engine = require('../lib/GameOfLife')
  , _ = require('lodash');

describe('Game engine', function(){

  describe('Initialization', function(){
    it ('Should create a game from a map', function(){
      var game = engine.fromMap(['0']);
      console.log(typeof game.grids.current);
      _.isArray(game.grids.current.map).should.equal(true);
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
      game.interate();
      game.cell(0,0).alive.should.equal.false;
      game.grids.current.should.deep.equal(['000','000','000']);
    });

    it('Should kill a cell with (?) neighbours', function(){
      // Create a map
      var game = game.fromMap([
        '010',
        '111',
        '010'
      ]);
      game.interate();
      game.cell(1,1).alive.should.equal.false;
      game.grids.current.should.deep.equal(['000','000','000']);
    });

  });

});