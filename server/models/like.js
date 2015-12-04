var db = require('../lib/db');

var Likes = {};

Likes.toggleLike = function(userId, projectId){
  //check if a project is public
  //check if project is liked
  //if yes -> unlikeProject
  //if no --> like it
};

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