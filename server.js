var express = require('express'),
	app = express();

app.use(express.static('src'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(3000, function () {
	console.log('Server started on port 3000.');
});