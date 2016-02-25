/**
 * A simple node.js server which "sits between" the chrome extension front end
 * and the SSLChain backend, a C++ Server and facilitaties communications between
 * them.
 */

var net = require('net');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');

var server = express();	//Initialize Server

https.createServer({
	key: fs.readFileSync('cert/key.pem'),
	cert: fs.readFileSync('cert/cert.pem')
}, server).listen(8080);

var key;
var returnStr;

//Configure the JSON Parser
server.use(bodyParser.json());

/*
 *	Set the headers
 *	This is important as we can't communicate through localhost w/o
 *	taking Cross-Origin Resource Sharing (CORS) into account
 */
server.all('/', function(req, res, next){
	//Response will be just plain text rather than JSON
	res.header('Content-Type', 'text/plain');
	//Handle CORS issues
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

//On POST requests....
server.post('/', function(req, res, next){
	var data = '';
	var output = '';

	//Print POST request to the console
	console.log(req.method);
	console.log(req.headers);
	console.log(req.url);

	//body = {data : email}
	email = req.body.email;

	var client = new net.Socket();
	client.connect(2048, '127.0.0.1', function(){
		console.log('Connected to SSLC Server');
		client.write('GET PUB KEY ' + email);
	});

	client.on('data', function(data){
		console.log('Recieved: ' + data);
		returnStr = data;
		res.send(returnStr);
		client.destroy();
	});
});

//server.listen(8080);

console.log('Server running on port 8080.');
