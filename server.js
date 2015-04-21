var childProcess = require('child_process');
var express = require('express');
var path = require('path');
var phantomjs = require('phantomjs');

var app = express();

app.get('/:hostName', function (req, res) {
	var childArgs = [
  		path.join(__dirname, 'mixed.js'),
  		req.params.hostName
	];

	childProcess.execFile(phantomjs.path, childArgs, function(err, stdout, stderr) {
		res.send({ code: (err || { code: 0 } ).code });
		res.end();
	});
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});