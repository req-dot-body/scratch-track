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

var lyrics = [ 
  {
    text: 'gonna write some code, s\'gonna be real cool, gonna make y\'all look like total fools',
    name: 'sweet rhymes'      
  },
  {  
    text: 'la la lalal la la lalaaaaaa'
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

exports.addLyrics = function(userId){
  var now = Math.round(Date.now()/1000);
  var project = {
    owner_id: userId,
    created_at: now,
    updated_at: now
  } 

  return db('projects').insert(project).returning('id')
  .then(function(rows){
    var projectId = rows[0]; 
    var newLyrics = lyrics[0];
    newLyrics.project_id = projectId;

    return request(app)
    .post('/lyrics')
    .send(newLyrics)
    .expect(201)
  })
  .then(function(res){
    return res.body; 
  }) 
}
