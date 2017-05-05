const MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var timeNow = function () {
	var date = new Date(),
	timeNow = date.getHours().toString() + ':' + 
		date.getMinutes().toString() + ':' + 
		date.getSeconds().toString() + ':' + 
		date.getMilliseconds().toString();
	console.log('\n+ ' + timeNow + '\n  Connected successfully to MongoDB/animmals');
}

// Connection URL
var url = 'mongodb://localhost:27017/animals';

function database (callback) {
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		timeNow();
		callback(db);
	});
}

module.exports = {
	db: database
};