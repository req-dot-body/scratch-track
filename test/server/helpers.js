var request = require('supertest-as-promised');
var db = require(__server + '/lib/db.js');
var app = TestHelper.createApp();

exports.app = app;

var users = [
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

//clears projects and project resources from DB
exports.clearProjects = function(){
  return db('lyrics').del()
    .then(function(){
      return db('recordings').del()
    })
    .then(function(){
      return db('stablature').del()
    })
    .then(function(){
      return db('notes').del()
    })
    .then(function(){
      return db('projects').del()
    })
}

//fully clear DB
exports.clearDB = function(){
  return exports.clearProjects()
    .then(function(){
      return db('users').del()
    })
}

//creates a new user and returns then id
exports.authedUser = function(userIndex){
	return db('users').insert(users[userIndex]).returning('id')
  .then(function(rows){
    return rows[0];
  })
}

//creates a new project
exports.createProject = function(){
  return request(app)
    .post('/projects')
    .expect(201)
    .then(function(res){
      return res.body;
    })
}
