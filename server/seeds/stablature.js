
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('table_name').del(), 

    // Inserts seed entries
    knex('table_name').insert({
    	project_id: 1,
    	code: 'lets pretend this is code',
    	created_at: 212837561324,
    	name: 'some chords',
    	desciption: 'there a C chord in there as well as some others'
    }),
    knex('table_name').insert({
    	project_id: 2,
    	code: 'totally code',
    	created_at: 12341324123,
    }),
    knex('table_name').insert({
    	project_id: 2,
    	code: 'yup. it\'s code',
    	created_at: 123413,
    	name: 'sweet riff'
    })
  );
};

// stab.number('project_id').notNullable()
// 	.reference('id').inTable('projects');
// stab.string('code').notNullable();
// stab.number('create_at').notNullable();
// stab.string('name', 50);
// stab.string('description');