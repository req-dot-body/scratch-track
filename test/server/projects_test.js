var request = require('supertest-as-promised');
var helpers = require('./helpers.js');
var projectsAPI = require(__server+'/routes/projectsRouter.js');
var app = helpers.app;

describe('Projects', function() {

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
      app.use('/api/projects', TestHelper.isLoggedIn, projectsAPI);
      app.testReady();
    });

  //clears the database, creates a user,
  //and creates mock session
  beforeEach(function(){
    return helpers.clearDB()
        .then(function(){
          return helpers.authedUser(0)
          .then(function(id){
            session.passport = {user: {id: id}};
          })
        })
  })

  it('can create a new project', function(){
    return request(app)
    .post('/api/projects')
    .expect(201)
    .expect(function(res){
      expect(res.body.id);
      expect(res.body.created_at);
    })
  })

  it('can get all projects', function(){
    return helpers.createProject(session.passport.user.id)
    .then(function(){
      return request(app)
      .get('/api/projects')
      .expect(200)
      .expect(function(res){
        var projects = res.body.projects;
        expect(projects.length).to.equal(1);
      })
      
    })
  })

  it('can get a particular project', function(){
    return helpers.createProject(session.passport.user.id)
    .then(function(project){
      var id = project.id;
      return request(app)
      .get('/api/projects/'+id)
      .expect(200)
      .expect(function(res){
        expect(res.body.id).to.equal(id)
      })
    })
  })

  it('can edit a particular project', function(){
    return helpers.createProject(session.passport.user.id)
    .then(function(project){
      var id = project.id;
      return request(app)
      .put('/api/projects/'+id)
      .send({name: 'awesome song idea'})
      .expect(200)
      .expect(function(res){
        expect(res.body.name).to.equal('awesome song idea')
      })
    })
  })

  it('can delete a particular project', function(){
    return helpers.createProject(session.passport.user.id)
    .then(function(project){
      var id = project.id;
      return request(app)
      .del('/api/projects/'+id)
      .expect(200)
      .then(function(){
        return request(app)
        .get('/api/projects/'+id)
        .expect(404);
      })
    })
  })

  it('can like and unlike a public project', function(){
    return helpers.createProject(session.passport.user.id)
    .then(function(project){
      var id = project.id;

      return request(app)
      .put('/api/projects/'+id)
      .send({private: 0})
      .expect(200)
    })
    .then(function(res){
      id = res.body.id;

      return request(app)
      .post('/api/projects/'+id+'/like')
      .expect(201)
    })
    .then(function(res){
      id = res.body.project_id
      return request(app)
      .post('/api/projects/'+id+'/like')
      .expect(200)
    })
  })

  it('can retrieve like count', function(){
    return helpers.createProject(session.passport.user.id)
    .then(function(){
      return helpers.createProject(session.passport.user.id)
    })
    .then(function(project){
      var id = project.id;

      return request(app)
      .put('/api/projects/'+id)
      .send({private: 0})
      .expect(200)
    })
    .then(function(res){
      id = res.body.id;

      return request(app)
      .post('/api/projects/'+id+'/like')
      .expect(201)
    })
    .then(function(res){
      id = res.body.project_id;

      return request(app)
      .get('/api/projects/'+id)
      .expect(200)
    })
    .then(function(res){
      expect(res.body.likes).to.equal('1');
    })
  })

  it('cannot like a private project', function(){
    return helpers.createProject(session.passport.user.id)
    .then(function(project){
      var id = project.id;
      return request(app)
      .post('/api/projects/'+id+'/like')
      .expect(400)
    })
  })

  it('can get like information on public projects', function(){
    return helpers.createProject(session.passport.user.id)
    .then(function(project){
      var id = project.id;
      return request(app)
      .put('/api/projects/'+id)
      .send({private: 0})
      .expect(200)
    })
    .then(function(res){
      id = res.body.id;

      return request(app)
      .post('/api/projects/'+id+'/like')
      .expect(201)
    })
    .then(function(res){
      var id = res.body.project_id;
      return request(app)
      .get('/api/projects/'+id+'/like')
    })
    .then(function(res){
      var project = res.body;
      expect(project.likes).to.equal('1');
      expect(project.liked).to.equal('1');
    })
  })

  it('can delete a project with resources', function(){
    return helpers.addResource('lyrics', session.passport.user.id)
    .then(function(lyrics){
      var userId = session.passport.user.id;
      var projectId = lyrics.project_id;
      return helpers.addResource('stablature', userId, projectId);
    })
    .then(function(stablature){
      var projectId = stablature.project_id;
      return request(app)
      .del('/api/projects/'+projectId)
      .expect(200)
    })
  })

  it('can retrieve lyrics for a particular project', function(){
    var projectId;

    return helpers.addResource('lyrics', session.passport.user.id)
    .then(function(lyrics){
      projectId = lyrics.project_id;
    })
    .then(function(){
      return helpers.addResource('lyrics', session.passport.user.id, projectId)
     })
    .then(function(){
      return request(app)
      .get('/api/projects/'+projectId+'/lyrics')
      .expect(200)
      .expect(function(res){
        expect(res.body.length).to.equal(2);
      })
    }) 
  })

  it('can retrieve stabs for a particular project', function(){
    var projectId;

    return helpers.addResource('stablature', session.passport.user.id)
    .then(function(stablature){
      projectId = stablature.project_id;
    })
    .then(function(){
      return helpers.addResource('stablature', session.passport.user.id, projectId)
     })
    .then(function(){
      return request(app)
      .get('/api/projects/'+projectId+'/stablature')
      .expect(200)
      .expect(function(res){
        expect(res.body.length).to.equal(2);
      })
    })
  })

  it('can retrieve recordings for a particular project', function(){
    var projectId;

    return helpers.addResource('recordings', session.passport.user.id)
    .then(function(recordings){
      projectId = recordings.project_id;
    })
    .then(function(){
      return helpers.addResource('recordings', session.passport.user.id, projectId)
     })
    .then(function(){
      return request(app)
      .get('/api/projects/'+projectId+'/recordings')
      .expect(200)
      .expect(function(res){
        expect(res.body.length).to.equal(2);
      })
    })
  })

  it('can retrieve notes for a particular project', function(){
    var projectId;

    return helpers.addResource('notes', session.passport.user.id)
    .then(function(notes){
      projectId = notes.project_id;
    })
    .then(function(){
      return helpers.addResource('notes', session.passport.user.id, projectId)
     })
    .then(function(){
      return request(app)
      .get('/api/projects/'+projectId+'/notes')
      .expect(200)
      .expect(function(res){
        expect(res.body.length).to.equal(2);
      })
    })
  })

});

