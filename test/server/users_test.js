var request = require('supertest-as-promised');
var routes = require(__server + '/app.js');
var helpers = require('./helpers.js');

describe('The User', function() {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  beforeEach(function(){
  	return helpers.clearDB();
  })

  it('can sign up, sign in, and sign out', function() {
    return request(app)
    .post('/api/users/signup')
    .send(helpers.users[0])
    .expect(201)
    .then(function(){
    	return request(app)
    	.post('api/users/signin')
    	.send(helpers.users[0])
    	.expect(200)
    })
    .then(function(){
    	return request(app)
    	.post('api/users/signout')
    	.expect(200)
    })
  });

  it('cannot sign in if they do not exist', function(){
  	return request(app)
  	.post('api/users/signin')
  	.send(helpers.users[0])
  	.expect(404)
  })

});

