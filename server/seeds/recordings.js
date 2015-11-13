
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('table_name').del(), 

    // Inserts seed entries
    knex('table_name').insert({
    	project_id: 1,
    	url: 'www.mediaupload.com/test.mp3'
    }),
    knex('table_name').insert({
    	project_id 3,
    	url: 'www.mediaupload.com/toadcroak.mp3',
    	description: 'sampled from a swamp in the dead of night' 
    }),
    knex('table_name').insert({
    	project_id: 3,
    	url: 'www.mediaupload.com/frognado.mp3',
    	name: 'frognado',
    	desciption: 'it quite the blustery frognado'
    })
  );
};

// recording.number('project_id').notNullable()
// 	.references('id').inTable('projects');
// recording.string('url').notNullable();
// recording.number('created_at').notNullable();
// recording.string('name', 50);
// recording.string('desciption');