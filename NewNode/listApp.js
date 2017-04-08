var express= require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var morgan = require('morgan');
const util = require('util')


var app = express();

app.use(morgan('combined'))
.use(express.static(__dirname + '/public'));

app.use(session({secret: 'topsecret'}));
app.use(function(req, res, next){
	if(typeof(req.session.mylist) == 'undefined'){
		req.session.mylist = [];
	}
	next();
})
.get('/', function(req, res){
	res.render('list.ejs',{mylist: req.session.mylist});
})

.get('/delete/:index', bodyParser.urlencoded({extended: false}), function(req, res){
	if(typeof(req.session.mylist) != 'undefined' || typeof(req.body.index) != 'undefined'){
		req.session.mylist.splice(req.params.index,1);
	}
	res.redirect('/');
})
.post('/add' , bodyParser.urlencoded({extended: false}), function(req, res){
	if(req.body.newItem != ''){
		req.session.mylist.push(req.body.newItem);
	}
	res.redirect('/');
})
.post('/action' , bodyParser.urlencoded({extended: false}), function(req, res){
		console.log("Action: " + req.body.actionItem);
		console.log("Action: " +util.inspect(req.body, false, null));

	res.redirect('/');
});

app.listen(8080);