var db = require('../lib/db');
var Project = require('./project');

var Likes = {};

Likes.toggleLike = function(userId, projectId){
  //checks that a project is private
  return Project.isPrivate(projectId)
  .then(function(isPrivate){
    if (isPrivate) throw 404;

    //checks if a like exists
    return Likes.findOne(userId, projectId)
    .then(function(rows){
      if (rows.length) {
        //unlikes existing project
        return Likes.unlike(rows[0].id);
      }

      //creates new like 
      return Likes.like(userId, projectId);
    })
  })
};

Likes.like = function(userId, projectId){
  return db('likes').insert({
    user_id: userId,
    project_id: projectId
  }).returning('*')
  .then(function(rows){
    return rows[0];
  })
};

Likes.unlike = function(likeId){
  return db('likes').where('id', '=', likeId).del().
  then(function(){
    return;
  })
}

//finds a like by project and user
Likes.findOne = function(userId, projectId){
  return db('likes').where('project_id', '=', projectId)
  .andWhere('user_id', '=', userId)
}

//deletes all of a users likes
//not currently necessary as there 
//is no way to delete an account
Likes.deleteByUser = function(userId){  
  return db('likes').where('user_id', '=', userId);
}

module.exports = Likes;