
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('projects').del(), 

    // Inserts seed entries
    knex('projects').insert({
    	owner_id: 1,
    	created_at: 21323232,
    	updated_at: 81237409182347,
    	name: 'the greatest song ever',
    	description: 'there are gonna be guitars and stuff and it\'ll be awesome!!'
    }),
    knex('projects').insert({
    	owner_id: 1,
    	created_at: 12983470192,
    	updated_at: 1283740123,
    }),
    knex('projects').insert({
    	owner_id: 2,
    	created_at: 928734,
    	updated_at: 1234704,
    	desciption: 'found-sound noise collage'
    })
  );
};


// project.increments('id').primary();
// project.number('owner_id').notNullable()
// 	.references('id').inTable('users');
// project.number('created_at').notNullable();
// project.number('updated_at').notNullable();
// project.string('name', 50)
// project.string('description')