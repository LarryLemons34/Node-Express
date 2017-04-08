var http = require('http');
var url = require('url');
var querystring = require('querystring');
var eventEmmitter = require('events').EventEmitter;
var testMod = require('testMod');
var markdown = require('markdown').markdown;

var server = http.createServer(function(req, res){
	var page = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});


	res.write('Well Hello\n');

console.log(markdown.toHTML('A paragraph in **markdown**!'));
	testMod.sayHello();
    var game = new eventEmmitter();
    game.on('gameover', function(name ,message){
    	res.write(message + ", " + name);
    });

    if ('firstname' in params && 'lastname' in params) {
        res.write('Your name is ' + params['firstname'] + ' ' + params['lastname'] + '\n');
        game.emit('gameover', params['firstname'] + ' ' + params['lastname'], 'You lose!');
    }
    else {
        res.write('You do have a first name and a last name, don\'t you?');
    }

	console.log(page);
	res.end();
});
server.listen(8080);