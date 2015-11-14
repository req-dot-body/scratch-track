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

  it('can signup and sign in', function() {
    return db.select('*').from('users')
      .then(function(users) {
        expect(users.length).to.equal(0);
      });
  });
});
