var randomID = require('./helpers').random;

exports.lyrics = function(projectIDs){
  return [
    {
      project_id: randomID(projectIDs), 
      text: 'gonna write some code, s\'gonna be real cool, gonna make y\'all look like total fools',
      created_at: 12341234,
      name: 'sweet rhymes'      
    },
    {
      project_id: randomID(projectIDs),
      text: 'la la lalal la la lalaaaaaa',
      created_at: 12341234
    }
  ]
}