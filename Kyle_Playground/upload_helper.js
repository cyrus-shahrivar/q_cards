

// var scanTemplate = Handlebars.compile($("#scan-card-template").html());
module.exports = function() {
var scan = {
    index: function index(req, res, next) {
        res.render("#scan-card-template");
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

}


 //[Formidable Upload Example](https://github.com/vnykmshr/formidable-upload-example).