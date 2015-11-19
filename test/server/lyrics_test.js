var request = require('supertest-as-promised');
var helpers = require('./helpers.js');
var resourcesApi = require(__server+'/routes/resourcesRouter.js');
var app = helpers.app;

describe('Lyrics', function() {

  var session = {passport: {user: {}}};

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
      app.use('/resources', TestHelper.isLoggedIn, resourcesApi);
      app.testReady();
    });

  //clears the database, creates a user,
  //and creates mock session
  beforeEach(function(){
    return helpers.clearDB()
        .then(function(){
          return helpers.authedUser(0)
          .then(function(id){
            session.passport.user.id = id;
          })
        })
  })

  xit('can have lyrics added', function(){
    return helpers.addResource('lyrics', session.passport.user.id)
    .then(function(lyrics){
      expect(lyrics.id);
      expect(lyrics.name).to.equal('sweet rhymes');
    })
  })

  xit('can have lyrics retrieved', function(){
    return helpers.addResource('lyrics', session.passport.user.id)
    .then(function(lyrics){
      var id = lyrics.id;
      return request(app)
      .get('/resources/lyrics/'+id)
      .expect(200)
      .expect(function(res){
        expect(res.body.name).to.equal('sweet rhymes');
      })
    })
  })

  xit('can have old lyrics edited', function(){
    return helpers.addResource('lyrics', session.passport.user.id)
    .then(function(lyrics){
      var id = lyrics.id;
      return request(app)
      .put('/resources/lyrics/'+id)
      .send({name: 'really freakin sweet rhymes'})
      .expect(200)
      .expect(function(res){
        expect(res.body.name).to.equal('really freakin sweet rhymes')
      })
    })
  })

  xit('can have old lyrics deleted', function(){
    var lyricsId;

    return helpers.addResource('lyrics', session.passport.user.id)
    .then(function(lyrics){
      lyricsId = lyrics.id;
      return request(app)
      .delete('/resources/lyrics/'+lyricsId)
      .expect(200)
    })
    .then(function(){
      return request(app)
      .get('/lyrics/'+lyricsId)
      .expect(404) 
    })
  })

});

