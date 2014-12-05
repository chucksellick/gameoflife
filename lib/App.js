var express = require('express')
  , fs = require('fs')
  , _ = require('lodash')
  , async = require('async');

module.exports = function() {
  var app = express();
  app.set('views', 'views');
  app.set('view engine', 'jade');

  var scripts = [
    'js/jquery/dist/jquery.js',
    'js/async/lib/async.js',
    'js/lodash/dist/lodash.js',
    'js/angular/angular.js',
    'js/angular-ui-utils/ui-utils.js',
    'js/angular-ui-router/release/angular-ui-router.js',
    'js/angular-bootstrap/ui-bootstrap-tpls.js',
    'js/ngstorage/ngStorage.js',
    'js/bootstrap/dist/js/bootstrap.js',
    'application.js',
    'game.js'
  ];

  app.get('/', function(req,res,next) {
    res.render('index.jade', {scripts:scripts});
  });

  _.each(fs.readdirSync('views/partials'), function(file){
    var name = file.substring(0,file.indexOf('.'));
    app.get('/partials/'+name+".html", function(req,res,next) {
      res.render('partials/'+file);
    });
  });

  // Serve static files in public
  app.use(express.static('public'));

  return app;
}
