var upload = require('formidable-upload');

var scan = {
    index: function index(req, res, next) {
        res.locals.title = 'Home';
        res.render('index');
    },

    upload: function uploadfn(req, res, next) {
        res.json(req.files);
    },

    errors: function errorsfn(err, req, res, next) {
        res.json({
            result: 'failed',
            error: err.message
        });
    }
};


var uploader = upload()
	.accept(/image*/)
	.to(['public', 'temp'], 'QRupload')
	.imguri();

module.exports = function (app) {
    app.get('/', home.index);
    app.get('/upload', home.index);
    app.post('/upload', uploader.middleware('imagefile'), home.upload, home.errors);
};


 //[Formidable Upload Example](https://github.com/vnykmshr/formidable-upload-example).