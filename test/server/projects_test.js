var request = require('supertest-as-promised');
var helpers = require('./helpers.js');
var projectsAPI = require(__server+'/routes/projectsRouter.js');
var app = helpers.app;

describe('The User', function() {

  var userId;

  before(function() {
      // mocks a logged in user
      app.use(function(req, res, next) {
        req.session = {};
        req.session.passport = {};
        
        //karl should be in there if seeding worked out       
        return helpers.clearDB()
        .then(function(){
          return helpers.authedUser(0)
          .then(function(id){
            req.session.passport.id = id;
            userId = id;
            console.log('id!', id);
            req.isAuthenticated = function() {
              return true;
            };
            next();
          })
          
        })


      });
      // end
      app.use('/projects', TestHelper.isLoggedIn, projectsAPI);
      app.testReady();
    });

  beforeEach(function(){

  })

  xit('can get all projects', function(){
    return request(app)
    .get('/projects')
    .expect(200)
    .expect(function(res){
      var projects = res.body.projects;
      expect(projects.length);
    })
  })

  it('can create a new project', function(){
    return request(app)
    .post('/projects')
    .expect(201)
    .expect(function(res){
      expect(res.body.id);
      expect(res.body.created_at);
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

