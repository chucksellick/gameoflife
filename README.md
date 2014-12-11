Game of Life AngluarJS demo
===========================

Unit tests (/test/*.js) can be run with:

  mocha

E2E tests (/test/e2e/*.js) can be run with:

  node server

  protractor

The game.js file is generated from lib/*.js using browserify, the command to regenerate the file is:

  browserify public/controllers/GameController.js -o public/game.js
  