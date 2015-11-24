
module.exports = {
	qrGen: function(_id, cb) {
		request('http://api.qrserver.com/v1/create-qr-code/?data=' + _id, function(error, response, body) {
			if (error) {
				console.log(error);
			} else {
				cb(body);
			}
		});
	},
};