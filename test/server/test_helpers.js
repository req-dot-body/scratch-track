var request = require('supertest-as-promised');
var db = require(__server + '/lib/db.js');

exports.clearDB = function(){
	return db('lyrics').truncate()
		.then(function(){
			return db('recordings').truncate()
		})
		.then(function(){
			return db('stablature').truncate()
		})
		.then(function(){
			return db('notes').truncate()
		})
		.then(function(){
			return db('projects').truncate()
		})
		.then(function(){
			return db('users').truncate()
		})
}