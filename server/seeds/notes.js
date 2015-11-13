
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('table_name').del(), 

    // Inserts seed entries
    knex('table_name').insert({
    	project_id: 2,
    	text: 'this will be my show stopper, fer sure'
    	created_at: 128347102
    }),
    knex('table_name').insert({
    	project_id: 3
    	text: 'I want to sample a train, and a frog, and a tornado... frognado',
    	created_at: 13241234,
    	name: 'brain-storming samples'
    })
  );
};

// note.number('project_id').notNullable()
// 	.references('id').inTable('projects');
// note.string('text').notNullable();
// note.number('created_at').notNullable();
// note.string('name', 50);