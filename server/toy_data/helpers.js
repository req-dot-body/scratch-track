
//grabs a random foreign id for toy data 
exports.random = function(idArray){
	return idArray[Math.floor(Math.random*idArray.length())];
}
