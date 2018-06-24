module.exports = (app) => {
    const multer = require('multer');
    var request = require('request-promise');
    var getRequestUrl = 'http://107.23.87.29:8080/presignedurl/';
    var getFormRequestUrlMatt = ' http://18.219.52.10:5000/';
    var getFormRequestUrlYev = ' http://107.23.87.29:8080/rawdata/';
    const uuidv4 = require('uuid/v4');
    const validator = require('express-validator')
    const { matchedData } = require('express-validator/filter')
    const { check, validationResult } = require('express-validator/check')
    var global_file;
    var global_formData = {};
    var global_file_put = false;
    var global_resume_filename = '';
    const fs = require('fs');




    const storage = multer.memoryStorage();


    const upload = multer({storage: storage});



       
   app.post('/uploadHandler', upload.single('file'), function (req, res, next) {
    if (req.file && req.file.originalname) {

      global_resume_filename = uuidv4();
        var options = {
              method: 'GET',
              uri: getRequestUrl.concat(global_resume_filename),
            };
           
        request(options)
        .then(function (body) {
            console.log("GET with success", body);
           

              var options2 = {
                method: 'PUT',
                url: JSON.parse(body).Message,
                headers: {
                  'ContentLength': req.file.size,
                },
                body: req.file.buffer,
              };

              request(options2).then(function (parsedBody) {
                    // POST succeeded...
                    console.log("PUT resume file success",parsedBody);
                    console.log(`Received file ${req.file.originalname}`);
                    
                  console.log("checking global_resume_filename", global_resume_filename);

                    res.end();
                    return;
                    
                 
                    
                   
                    
                })
                .catch(function (err) {
                    // POST failed...
                    console.log("PUT resume file NO success",err);
                   res.status(500);
                   
                });

                console.log("did get here");
                return;
                

        })

        .catch(function (err) {
            // Delete failed...
            console.log("GET no success for file URL ", err);
           
           
        });         
          
      }
       
    });

  app.post('/contact', (req, res) => {

    console.log("checking req body", req.body);
    global_formData = req.body;
         
    if (req.body) {
      var options = {
      method: 'GET',
      uri: getFormRequestUrlMatt.concat(global_resume_filename),
                  
      };
               
    request(options)
      .then(function (body) {
               console.log("recieved ok from Mustafa parser", body);
               console.log("checking get request url for yevs parser", getFormRequestUrlYev.concat(global_resume_filename));

                var options2 = {
                method: 'GET',
                uri: getFormRequestUrlYev.concat('"'+global_resume_filename+'"'),
                            
                };

                request(options2)
                  .then(function(body){

                    console.log("recieved ok from Yevs parser", body);

                  })
                  .catch(function(err){
                    console.log("GET no success for Yevs parser ", err);
                  })

        })
     .catch(function (err) {
                // Delete failed...
      console.log("GET no success for Mustafa parser ", err);
               
               
      });
    }
  });
}
