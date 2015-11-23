module.exports = {
	qrGen: function(user_id, cb) {
		request('http(s)://api.qrserver.com/v1/read-qr-code/?fileurl=' + encodeURI(user_id), function(error, response, body) {
			if (error) {
				console.log(error);
			} else {
				cb(body);
			}
		});
	}
}