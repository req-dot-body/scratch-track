var randomID = require('./helpers').random;

exports.recordings = function(projectIDs){
  return [
    {
      project_id: randomID(projectIDs),
      url: 'www.mediaupload.com/test.mp3',
      created_at: 1234123
    },
    {
      project_id: randomID(projectIDs),
      url: 'www.mediaupload.com/toadcroak.mp3',
      description: 'sampled from a swamp in the dead of night',
      created_at: 1234123
    },
    {
      project_id: randomID(projectIDs),
      url: 'www.mediaupload.com/frognado.mp3',
      created_at: 1234123,
      name: 'frognado',
      description: 'it quite the blustery frognado'
    }
  ]
}
