var home = require('./home');
var upload = require('formidable-upload');

var uploader = upload().accept(/image*/).to(['public', 'data', 'images'], '9876543210').imguri();

module.exports = function (app) {
    app.get('/', home.index);
    app.get('/upload', home.index);
    app.post('/upload', uploader.middleware('imagefile'), home.upload, home.errors);
};


 //[Formidable Upload Example](https://github.com/vnykmshr/formidable-upload-example).