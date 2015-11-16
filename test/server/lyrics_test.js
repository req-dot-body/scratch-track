var request = require('supertest-as-promised');
var helpers = require('./helpers.js');
var lyricsAPI = require(__server+'/routes/lyricsRouter.js');
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
      app.use('/lyrics', TestHelper.isLoggedIn, lyricsAPI);
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

  it('can add lyrics', function(){
    return helpers.addLyrics(session.passport.id)
    .then(function(lyrics){
      expect(lyrics.id);
      expect(lyrics.name).to.equal('sweet rhymes');
    })
  })

  it('can retrieve old lyrics', function(){
    return helpers.addLyrics(session.passport.id)
    .then(function(lyrics){
      var id = lyrics.id;
      return request(app)
      .get('/lyrics/'+id)
      .expect(200)
      .expect(function(res){
        expect(res.body.name).to.equal('sweet rhymes');
      })
    })
  })

});

