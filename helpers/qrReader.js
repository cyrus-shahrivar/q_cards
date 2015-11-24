
module.exports = {
	qrRead: function(qr_code, cb) {
		request(('http://api.qrserver.com/v1/read-qr-code/?fileurl=' + encodeURI(qr_code)), function(error, response, body) {
			if (error) {
				console.log(error);
			} else {
				cb(body);
			}
		});
	}
}