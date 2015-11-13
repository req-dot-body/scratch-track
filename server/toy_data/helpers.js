
//grabs a random foreign id for toy data 
exports.random = function(idArray){
	var index = Math.floor(Math.random()*idArray.length);
	return idArray[index].id;
}
