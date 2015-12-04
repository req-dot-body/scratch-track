var db = require('../lib/db');

var Likes = {};

Likes.toggleLike = function(userId, projectId){
  //check if a project is public
  //check if project is liked
  //if yes -> unlikeProject
  //if no --> like it
};

Likes.likeCount = function(projectId){ 
  //count likes for that project  
};

Likes.likedByUser = function(userId, projectId){
  //checks if a project is liked by a user
  //return boolean 
}

module.exports = Likes;