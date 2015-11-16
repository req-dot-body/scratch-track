var Model = {
	lyrics: require('../models/lyrics.js'),
	recordings: require('../models/recording.js'),
	stablature: require('../models/stablature.js'),
	notes: require('../models/note.js')
}

exports.post = function(req, res, resource){
	var projectInfo = req.body;
	projectInfo.created_at = Math.round(Date.now()/1000);

	Model[resource].create(projectInfo, req.session.passport.id)
	.then(function(resource){
		res.status(201).send(resource);
	})
	.catch(function(err){
		console.log('Could not create new resource')
	}) 
}

exports.get = function(req, res, resource){
	var resourceId = req.param.resourceId;
	Model[resource].findById(resourceId, req.session.passport.id)
	.then(function(resource){
		res.status(200).send(resource);
	})
	.catch(function(err){
		res.sendStatus(404);
	})
}