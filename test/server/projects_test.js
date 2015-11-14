var request = require('supertest-as-promised');
var helpers = require('./helpers.js');
var app = TestHelper.createApp();
var projectsAPI = require(__server+'/routes/projectsRouter.js');

describe('The User', function() {

  before(function() {
      // mocks a logged in user
      app.use(function(req, res, next) {
        req.session = {};
        
        //karl should be in there if seeding worked out       
        req.session.passport = {
          email: 'karl_skid_marx@gmail.com'
        };


        req.isAuthenticated = function() {
          return true;
        };
        next();
      });
      // end
      app.use('/projects', TestHelper.isLoggedIn, projectsAPI);
      app.testReady();
    });

    var project = {
      created_at: 1234143,
      updated_at: 12341234
    }

  // beforeEach(function(){
  // 	return helpers.clearDB();
  // })

  xit('can get all projects', function(){
    return request(app)
    .get('/projects')
    .expect(200)
    .expect(function(res){
      var projects = res.body.projects;
      expect(projects.length);
    })
  })

  xit('can create a new project', function(){
    return request(app)
    .post('/projects')
    .send(project)
    .expect(201)
    .expect(function(res){
      expect(res.body.id);
      expect(res.body.created_at).to.equal(project.created_at);
    })
  })

  xit('can get a particular project', function(){
    return request(app)
    .get('/projects/9')
    .expect(200)
    .expect(function(res){
      expect(res.body.id).to.equal(9)
    })
  })

  xit('can edit a particular project', function(){
    return request(app)
    .put('/projects/9')
    .send({updated_at: 1234})
    .expect(200)
    .expect(function(res){
      expect(res.body.updated_at).to.equal(1234);
    })
  })

  xit('can delete a particular project', function(){
    return request(app)
    .del('/projects/9')
    .expect(200)
    .then(function(){
      return request(app)
      .get('/projects/9')
      .expect(404);
    })
  })
});

