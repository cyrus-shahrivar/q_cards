var Company = require('./models/company.js'),
    User = require('./models/user.js'),
    BusinessCardInfo = require('./models/businessCardInfo.js'),
    mongoose = require('mongoose');

//connect to mongo database
mongoose.connect('mongodb://localhost/q_cards_app', function (err) {
  if(err){
    console.log(err);
  } else {
    console.log('connection successful2');
  }
});

var photosArray = [];

var processPhoto = photos.collection.insert(photosArray, onPhotosInsert);

function onPhotosInsert(err, docs) {
  if (err) {
      console.log(err);
  } else {
      console.info("Image received, processing QR code...", docs.length);
      deletePhotos();
  }
}

var deletePhotos = function(db, cb) {
	db.collection('photos').deleteMany( {}, function(err, results) {
		console.log(results);
		console.log("Image removed from database.")
		cb();
	});
}