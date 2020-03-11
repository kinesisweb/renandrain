const self = module.exports = {
	requestData: function(req,res,next) {
		res.locals.requestData = {
			ip: (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress,
			agent: req.headers['user-agent'] || ""
		}
		next();
	}
}