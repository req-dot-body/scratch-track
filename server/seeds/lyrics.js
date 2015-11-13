
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('lyrics').del(), 

    // Inserts seed entries
    knex('lyrics').insert({
    	project_id: 2, 
    	text: 'gonna write some code, s\'gonna be real cool, \n
    				gonna make y\'all look like total fools',
    	created_at: 12341234,
    	name: 'sweet rhymes'			
    }),
    knex('lyrics').insert({
    	project_id: 2,
    	text: 'la la lalal la la lalaaaaaa',
    	created_at: 12341234
    })
  );
};

// lyricEntry.increment('id').primary();
// lyricEntry.number('project_id').notNullable()
// 	.references('id').inTable('projects');
// lyricEntry.string('text').notNullable();
// lyricEntry.number('created_at').notNullable();
// lyricEntry.string('name', 50);