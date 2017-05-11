const express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(express.static('./src'));
app.use( bodyParser.json() );       // для поддержки JSON
app.use(bodyParser.urlencoded({     // для поддержки URL кодировки
  extended: true
}));

require('./routes')(app);

app.listen(3000, function () {
	console.log('\nServer started on port 3000.');
});