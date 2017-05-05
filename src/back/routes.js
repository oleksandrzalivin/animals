var db = require('./db').db;

var timeNow = function () {
	var date = new Date(),
	timeNow = date.getHours().toString() + ':' + 
		date.getMinutes().toString() + ':' + 
		date.getSeconds().toString() + ':' + 
		date.getMilliseconds().toString();
	console.log('  - ' + timeNow + '\n' + '    connection closed');
};

module.exports = function (app) {

	app.get('/', function (req, res) {
		var path = __dirname.slice(0, -4); // \src\back повернути до \src\
		res.sendFile(path + 'front/index.html');
	});
/*
	app.get('/api/menu', function (req, res) {
		db(function(db) {
			db.collection('menu').find().toArray(function (err, docs) {
				res.send(docs);
				db.close();
				timeNow();
			});
		});
	});
*/
	app.get('/api/collection/:id', function (req, res) {
		var id = req.params.id;
		db(function(db) {
			db.collection(id).find().toArray(function (err, docs) {
				res.send(docs);
				db.close();
				timeNow();
			});
		});
	});

	// 404
	app.use(function (req, res, next) {
  		res.status(404).send("Sorry can't find that!")
	});
}