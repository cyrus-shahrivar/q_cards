var upload 		= require('formidable-upload')
	,express 	= require('express')
	,mongoose 	= require('mongoose')
;

upload().to(['public', 'temp']).accept([/image*/])

      // Build an upload instance but don't execute it right now
      var uploader = upload()
          .accept([/image*/])
          .to(['public', 'temp'], 'temp_image')
          .resize({
              use: 'resize',
              settings: {
                  width: 500,
                  quality: 80
              }
          })
          .imguri();


      // Define a middleware for handling image upload
      //app.post('/upload', uploader.middleware('userfile'), routes.upload);

 //[Formidable Upload Example](https://github.com/vnykmshr/formidable-upload-example).