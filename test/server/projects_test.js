var request = require('supertest-as-promised');
var helpers = require('./helpers.js');
var projectsAPI = require(__server+'/routes/projectsRouter.js');
var app = helpers.app;

describe('The User', function() {

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

  it('can create a new project', function(){
    return request(app)
    .post('/projects')
    .expect(201)
    .expect(function(res){
      expect(res.body.id);
      expect(res.body.created_at);
    })
  })

  it('can get all projects', function(){
    return helpers.createProject()
    .then(function(){
      return request(app)
      .get('/projects')
      .expect(200)
      .expect(function(res){
        var projects = res.body.projects;
        expect(projects.length).to.equal(1);
      })
      
    })
  })

  it('can get a particular project', function(){
    return helpers.createProject()
    .then(function(project){
      var id = project.id;
      return request(app)
      .get('/projects/'+id)
      .expect(200)
      .expect(function(res){
        expect(res.body.id).to.equal(id)
      })
    })
  })

  it('can edit a particular project', function(){
    return helpers.createProject()
    .then(function(project){
      var id = project.id;
      return request(app)
      .put('/projects/'+id)
      .send({name: 'awesome song idea'})
      .expect(200)
      .expect(function(res){
        expect(res.body.name).to.equal('awesome song idea')
      })
    })
  })

  it('can delete a particular project', function(){
    return helpers.createProject()
    .then(function(project){
      var id = project.id;
      return request(app)
      .del('/projects/'+id)
      .expect(200)
      .then(function(){
        return request(app)
        .get('/projects/'+id)
        .expect(404);
      })
    })
  })
});

