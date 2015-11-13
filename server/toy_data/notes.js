var randomID = require('helpers').random;

exports.lyrics = function(projectIDs){
  return [
    {
      project_id: randomID(projectIDs),
      text: 'this will be my show stopper, fer sure',
      created_at: 128347102
    },
    {
      project_id: randomID(projectIDs),
      text: 'I want to sample a train, and a frog, and a tornado... frognado',
      created_at: 13241234,
      name: 'brain-storming samples'
    }
  ]
}

