var request = require('superagent');
var db = require(__server + '/lib/db.js');

// exports.clearDB = function(){
// 	return db('lyrics').del()
// 		.then(function(){
// 			return db('recordings').del()
// 		})
// 		.then(function(){
// 			return db('stablature').del()
// 		})
// 		.then(function(){
// 			return db('notes').del()
// 		})
// 		.then(function(){
// 			return db('projects').del()
// 		})
// 		.then(function(){
// 			return db('users').truncate()
// 		})
// }

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

exports.authedUser = function(userIndex){
	var userInfo = users[userIndex];
	var user = request.agent();
	return user
		.post('/api/users/signup')
		.send(userInfo)
		.end(function(){
			return user
				.post('api/users/signin')
				.send(userInfo)
				.end(function(){
					return user
				})
		})
}