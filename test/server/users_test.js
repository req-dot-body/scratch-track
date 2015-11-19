var request = require('supertest-as-promised');
var routes = require(__server + '/app.js');
var helpers = require('./helpers.js');

describe('The User', function() {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  var fakeUser1 = {
    email: 'steve@outer.space',
    password: 'scienceiscool',
    first: 'Bill',
    last: 'Nye'
  };

  var fakeUser2 = {
    email: 'ballen@flash.com',
    password: 'thispasswordwastypedextremelyfast!!',
    first: 'Barry',
    last: 'Allen'
  };

  var fakeUser3 = {
    email: 'mr@robot.com',
    password: 'evilcorp',
    first: 'Elliot',
    last: 'Alderson'
  };

  before(function () {
    helpers.clearDB();
  });

  // beforeEach(function(){
  //   // return helpers.clearDB();
  // });

  describe('Can', function () {
    it('They can sign up', function () {
      return request(app)
        .post('/api/users/signup')
        .send(fakeUser1)
        .expect(201);
    });

    // Doesnt work because of supertest not using passport middleware
    xit('They can sign in', function () {
      return request(app)
        .post('/api/users/signin')
        .send(fakeUser1)
        .expect(200);
    });

    it('They can sign out', function () {
      return request(app)
        .post('/api/users/signout')
        .expect(200);
    });
  });

  describe('Cant', function () {
    it('Sign in without existing', function () {
      return request(app)
        .post('/api/users/signin')
        .send(fakeUser2)
        .expect(401);
    });

    // TODO : Add more endpoints
    describe('Visit endpoints that require authentication', function () {
      describe('Users enpoints', function () {
        xit('GET /api/users/:userId', function () {
          return request(app)
            .get('/api/users/1')
            .expect(401);
        });
        xit('PUT /api/users/:userId', function () {
          return request(app)
            .put('/api/users/1')
            .expect(401);
        });
        xit('GET /api/users/:userId/projects', function () {
          return request(app)
            .put('/api/users/1/projects')
            .expect(401);
        });
        xit('GET /api/users/:userId/collaborations', function () {
          return request(app)
            .put('/api/users/1/collaborations')
            .expect(401);
        });

      });

      xdescribe('Projects endpoints', function () {
        it('POST /api/projects', function () {
          return request(app)
            .post()
            .expect(401);
        });
      });
    });
  });
});

