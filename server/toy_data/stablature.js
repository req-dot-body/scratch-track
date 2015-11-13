var randomID = require('helpers').random;

exports.stablature = function(projectIDs){
  return [
    {
      project_id: randomID(projectIDs),
      code: 'lets pretend this is code',
      created_at: 2121324,
      name: 'some chords',
      desciption: 'there a C chord in there as well as some others'
    },
    {
      project_id: randomID(projectIDs),
      code: 'totally code',
      created_at: 1224123
    },
    {
      project_id: randomID(projectIDs),
      code: 'yup. it\'s code',
      created_at: 123413,
      name: 'sweet riff'
    }
  ]
}