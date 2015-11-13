
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({
    	email: 'karl_skid_marx@gmail.com',
    	password: '12383838askdfkjhadsf',
    	first: 'Karl',
    	last: 'Marx'
    }),
    knex('users').insert({
    	email: 'songwriter_omg@yahoo.com',
    	password: 'iouoiuoiuoiuoiuoi',
    	first: 'Jenny',
    	last: 'Bloodbath'
    }),
    knex('users').insert({
    	email: 'shadyp@gmail.com',
    	password: 'dhdhdh',
    	first: 'Shady Pete',
    	second: 'Johnson'
    })
  );
};


// user.increments('id').primary();
// user.string('password', 25);
// user.string('email', 25).unique().notNullable();
// user.string('first', 25).unique().notNullable();