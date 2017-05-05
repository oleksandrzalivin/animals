const express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(express.static('./src'));
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

app.listen(3000, function () {
	console.log('\nServer started on port 3000.');
});