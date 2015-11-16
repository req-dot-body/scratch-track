var request = require('supertest-as-promised');
var helpers = require('./helpers.js');
var projectsAPI = require(__server+'/routes/projectsRouter.js');
var app = helpers.app;

describe('A project', function() {

  var session = {passport: {}};

  before(function() {
      // mocks a logged in user
      app.use(function(req, res, next) {
        req.session = session;
        req.isAuthenticated = function() {
          return true;
        };
        next();
      });
      
      // end
      app.use('/projects', TestHelper.isLoggedIn, projectsAPI);
      app.testReady();
    });

  //clears the database, creates a user,
  //and creates mock session
  beforeEach(function(){
    return helpers.clearDB()
        .then(function(){
          return helpers.authedUser(0)
          .then(function(id){
            session.passport.id = id;
          })
        })
  })

  xit('can have lyrics', function(){
    return request(app)
    .post('/projects')
    .expect(201)
    .expect(function(res){
      expect(res.body.id);
      expect(res.body.created_at);
    })
  })

});

