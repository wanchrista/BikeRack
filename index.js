var express = require('express');
var app = express();
var path = require('path');
var http= require('http');
var mongoose = require('mongoose');

var uristring = prcoess.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/index';

var theport = process.env.PORT || 5000;


mongoose.connect(uristring, function (err, res){
  if (err){
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  }
  else{
    console.log('Succeeded connected to: ' + uristring);
  } 
});

app.set('port', theport);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(request, response) {
  response.render('pages/index')
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

    app.get('/index', function(req, res) {
        res.render('pages/index');
    })

    app.get('/login', function(req, res) {
        res.render('pages/login');
    })

    app.get('/signup', function(req, res) {
        res.render('pages/signup');
    })

    app.get('/search', function(req, res) {
        res.render('pages/search');
    })

