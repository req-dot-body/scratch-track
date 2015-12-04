var db = require('../lib/db');
var Project = require('./project');

var Likes = {};

Likes.toggleLike = function(userId, projectId){
  //checks that a project is private
  return Project.isPrivate
  .then(function(isPrivate){
    if (isPrivate) throw 404;

    //checks if a like exists
    return db('likes').where('user_id', '=', userId)
    .andWhere('project_id', '=', projectId)
    .then(function(rows){
      if (rows[0]) {
        //unlikes existing project
        return Likes.unlike(rows[0].id);
      }

      //creates new like 
      return Likes.like(userId, projectId);
    })
  })
};

Likes.like = function(userId, projectId){
  
};

Likes.unlike = function(likeId){

}

//adds like information to an array of public projects
Likes.publicProjects = function(projects){

}

//adds like information to an array of your projects
Likes.myProjects = function(projects){

}

//count likes for that project
Likes.likeCount = function(projectId){ 
  
};

//checks if a project is liked by a user
Likes.likedByUser = function(userId, projectId){
  //return boolean 
}

//deletes all of a projects likes
Likes.deleteByProject = function(projectId){

}

//deletes all of a users likes
//not currently necessary as there 
//is no way to delete an account
Likes.deleteByUser = function(userId){

}

module.exports = Likes;