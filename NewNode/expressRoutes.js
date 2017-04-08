var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var app = express();

app.use(morgan('combined'))
.use(express.static(__dirname + '/public'))
.use(favicon(__dirname + '/public/favicon.ico'))
.use(function(req, res){
	res.send('Hello');
});

app.get('/', function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.end('You\'re in reception');
})
.get('/floor/:floornum/bedroom', function(req, res){
	res.render('bedroom.ejs', {floor: req.params.floornum});
})
.get('/count/:number', function(req, res){
	var names= ['Robert', 'Jack', 'David'];
	res.render('page.ejs', {counter: req.params.number, names: names});
})
//for 404 pages
.use(function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page cannot be found!');
});

app.listen(8080)