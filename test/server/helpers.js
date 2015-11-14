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

exports.users = [
  {
    email: 'karl_skid_marx@gmail.com',
    password: '12383838askdfkjhadsf',
    first: 'Karl',
    last: 'Marx'
  },
  {
    email: 'songwriter_omg@yahoo.com',
    password: 'iouoiuoiuoiuoiuoi',
    first: 'Jenny',
    last: 'Bloodbath'
  },
  {
    email: 'shadyp@gmail.com',
    password: 'dhdhdh',
    first: 'Shady Pete',
    last: 'Johnson'
  }
]