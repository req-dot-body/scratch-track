var randomID = require('helpers').random;

exports.recordings = function(projectIDs){
  return [
    {
      project_id: randomID(projectIDs),
      url: 'www.mediaupload.com/test.mp3'
    },
    {
      project_id: randomID(projectIDs),
      url: 'www.mediaupload.com/toadcroak.mp3',
      description: 'sampled from a swamp in the dead of night' 
    },
    {
      project_id: randomID(projectIDs),
      url: 'www.mediaupload.com/frognado.mp3',
      name: 'frognado',
      desciption: 'it quite the blustery frognado'
    }
  ]
}
