var request = require('supertest-as-promised');
var routes = require(__server + '/app.js');
var db = require(__server + '/lib/db.js');

describe('The Server', function() {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it('can access the database', function() {
    return db.select('*').from('users')
      .then(function(users) {
        expect(users.length).to.equal(3);
      });
  });
});
