var randomID = require('helpers').random;

exports.projects = function(userIDs){
  return [
    {
      owner_id: randomID(userIDs),
      created_at: 21323,
      updated_at: 81237,
      name: 'the greatest song ever',
      description: 'there are gonna be guitars and stuff and it\'ll be awesome!!'
    },
    {
      owner_id: randomID(userIDs),
      created_at: 1298347,
      updated_at: 1283740
    },
    {
      owner_id: randomID(userIDs),
      created_at: 928734,
      updated_at: 1234704,
      description: 'found-sound noise collage'
    }
  ]
}
