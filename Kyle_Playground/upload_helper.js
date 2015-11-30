

// // var scanTemplate = Handlebars.compile($("#scan-card-template").html());
// module.exports = function() {
// var scan = {
//     index: function index(req, res, next) {
//         res.render("#scan-card-template");
//     },

//     upload: function uploadfn(req, res, next) {
//         res.json(req.files);
//     },

//     errors: function errorsfn(err, req, res, next) {
//         res.json({
//             result: 'failed',
//             error: err.message
//         });
//     }
// };

// }


 //[Formidable Upload Example](https://github.com/vnykmshr/formidable-upload-example).

 var upload = require('formidable-upload');

var scan = {
    index: function index(req, res, next) {
        res.locals.title = 'Scan';
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
    .to(['public', 'temp'], 'QR123')
    //XXX: to use resize, install `magickwand` and uncomment this
    /*.resize({
        use: 'resize',
        settings: {
            width: 800,
            quality: 80
        }
    })*/
    .imguri();

module.exports = function (app) {
    app.get('/', scan.index);
    app.get('/upload', scan.index);
    app.post('/upload', uploader.middleware('imagefile'), scan.upload, scan.errors);
};