
   const uuidv4 = require('uuid/v4');
    const validator = require('express-validator')
    const { matchedData } = require('express-validator/filter')
    const { check, validationResult } = require('express-validator/check')
    var global_file;
    var  global_submit_result_data;
    var global_resumeID = '';
    var global_formData;
    var global_file_put = false;
    var global_resume_filename = '';
    var global_file_extension = '';
    var global_linkedIn_parse = false;
    const fs = require('fs');
module.exports = (app) => {
    const multer = require('multer');
    var request = require('request-promise');
    var getRequestUrl = 'http://107.23.87.29:8080/presignedurl/';
    var getFormRequestUrlMatt = ' http://18.219.52.10:5000/';
    var getFormRequestUrlYev = ' http://107.23.87.29:8080/rawdata/';

    
 



function formData_POST(formData,resumeID,res){

console.log("checking got to form POST function : ",formData, "checking resumeid: ", global_resumeID);
global_resumeID = resumeID;


var POST_FORM = {}

POST_FORM["ResumeID"] = global_resumeID;
POST_FORM["Name"] = formData["formData"]["Name"];
POST_FORM["Email"] = formData["formData"]["Email"];
POST_FORM["Mobile"] = formData["formData"]["Mobile"];
POST_FORM["Salary"] = formData["formData"]["salary"];
POST_FORM["Status"] = formData["formData"]["currentStatus"];
POST_FORM["Location"] = formData["formData"]["Location"];
POST_FORM["Relocation"] = formData["formData"]["relocationChecked"];
POST_FORM["Travel"] = formData["formData"]["travelChecked"];

console.log("checking POST_FORM", POST_FORM);
 var options= {
                method: 'POST',
                url: 'http://107.23.87.29:8080/submitbasicinfo',
                body: JSON.stringify(POST_FORM),
               
              }

              

                request(options)
                  .then(function(body){

                    console.log("recieved ok from POST of form data", body);
                    global_linkedIn_parse = false;
                     res.send("got back to front client from /contact");
                  })
                    .catch(function(err){
                      console.log("no POST success for FORM Data ", err);
                    }).finally(function () {
                     
                      console.log("done with form POST request");
                       });
  }


    function callParsers(res){
       var options = {
              method: 'GET',
              uri: getFormRequestUrlMatt,
                          
              };

              
                       
            request(options)
              .then(function (body) {
                      
                       
                      

                      //if(body[Code] == 200){
                         console.log("recieved ok from Mustafa parser for RESUME ID", body);

                            var options2 = {
                            method: 'GET',
                            uri: global_linkedIn_parse ? 'http://107.23.87.29:8080/rawdatalinkedin/'.concat(global_resumeID)+'/'.concat('"'+global_resume_filename+'"') :  getFormRequestUrlYev,
                                        
                            };



                            request(options2)
                              .then(function(body){

                                      // if(body[Code] == 200){

                                      console.log("recieved ok from Yevs parser FOR RESUME ID", body);
                                      global_resumeID = JSON.parse(body).Data;
                                      
                                     

                                    // }
                                     // else console.log("didnt get 200 from Yevs parser, got", body);

                              })
                              .catch(function(err){
                                console.log("GET no success for Yevs parser FOR RESUME ID ", err);
                              }).finally(function () {
                                  console.log("done with GET request for Yevs Parser FOR RESUME ID");
                                   res.status(200).send( global_resumeID);
                                  
                                   });
                       // }
                       // else console.log("didnt get 200 from MUstafas parser, got", body);

                })
             .catch(function (err) {
                        // Delete failed...
              console.log("GET no success for Mustafa parser FOR RESUME ID", err);
                       
                       
              }).finally(function () {
                              console.log("done with GET request for Mustafas parser FOR RESUME ID");
                               });
    }


    const storage = multer.memoryStorage();


    const upload = multer({storage: storage});




    app.post('/analyze',(req,res) => {
      var url = 'http://107.23.87.29:8080/parsedresult/'+global_resumeID;
      console.log("checking analyze url",url);

       var options = {
              method: 'GET',
              uri: url,
      };
           
        request(options)
         .then(function (body){

          console.log("analyze GET body",body);
          res.send(JSON.parse(body)["Data"]);

        })
          .catch(function (err) {
                // Delete failed...
                console.log("FAIL for GET analyze ", err);
               
               
            })
            .finally(function () {
                      console.log("done with analyze GET");

              });
})


       
   app.post('/uploadHandler', upload.single('file'), function (req, res, next) {
    if (req.file && req.file.originalname) {

      global_resume_filename = uuidv4();
       
       global_file_extension = req.file.originalname.substr(req.file.originalname.lastIndexOf('.') + 1);
       global_resume_filename = global_resume_filename.concat("."+global_file_extension);
      getFormRequestUrlMatt = 'http://18.219.52.10:5000/'.concat(global_resume_filename);
       getFormRequestUrlYev = 'http://107.23.87.29:8080/rawdata/'.concat('"'+global_resume_filename+'"');


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

              request(options2).then(function (body) {
                    // POST succeeded...
                    console.log("PUT resume file success",body);
                    console.log(`Received file ${req.file.originalname}`);
                    global_file_put = true;

                    
              


                    
                  console.log("checking global_resume_filename", global_resume_filename);
                  

                 

                    
                    
                    
                 
                    
                   
                    
                })
                .catch(function (err) {
                    // POST failed...
                    console.log("PUT resume file NO success",err);
                   res.status(500);
                   
                }).finally(function () {
                      console.log("done with all requests2");
                      callParsers(res);
                     
                       });
                
                

        })

        .catch(function (err) {
            // Delete failed...
            console.log("GET no success for file URL ", err);
           
           
        }).finally(function () {
                      console.log("done with all requests5");
                       });        
          
      }
       
    });

  app.post('/contact', (req, res) => {

    console.log("checking req body", req.body);
    global_formData = req.body;

         
    if (req.body) {



     
        formData_POST(global_formData,global_resumeID,res);
       
    
    }
  });


  app.post('/submitResult', (req, res) => {

    console.log("checking req body submitresult analyzepage", req.body);
    global_submit_result_data = req.body;

         
    if (req.body) {



     
        var options = {
      method: 'PUT',
      uri:  'http://107.23.87.29:8080/submitresult',
      body: JSON.stringify(req.body)
                  
      };

      request(options)
        .then(function (body){

          // if (body[Code] == 200){
          console.log("heres the response for PUT for analyze page", body);




         
       //getFormRequestUrlYev = getFormRequestUrlYev.concat('"'+global_resume_filename+'"');

    //     var getFormRequestUrlMatt = ' http://18.219.52.10:5000/';
    // var getFormRequestUrlYev = ' http://107.23.87.29:8080/rawdata/';
         
            res.send("Analyze page was successful for PUT");

          // }

          // else console.log("didnt get 200 for LinkedIN post, got ", body);
        })
         .catch(function (err) {
                // Delete failed...
      console.log("FAIL for PUT for analyze page ", err);
               
               
      }).finally(function () {
                      console.log("done with ANALYZE PUT");

                       });
    
    }
  });

app.get('/getResumeId', function(req, res){
  res.send(global_resumeID);
});

  app.post('/linkedin', (req,res) => {



    console.log("checking linkedIn req body", req.body);
    console.log("checking if first file was recieved and the linkedIN url ", global_file_put, global_resumeID);

    
    if (req.body) {
       var options = {
      method: 'POST',
      uri: req.body["ResumeID"] ? 'http://107.23.87.29:8080/linkedinafterresume/'+req.body["ResumeID"] :'http://107.23.87.29:8080/linkedin',
      body: JSON.stringify(req.body["Response"])
                  
      };

      request(options)
        .then(function (body){

          // if (body[Code] == 200){
          console.log("heres the response for linkedIN post", body);


          global_resumeID = JSON.stringify(JSON.parse(body).Data);
           global_resumeID = global_resumeID.replace('"','');
          global_resumeID= global_resumeID.replace('"','');
          global_linkedIn_parse = true;
          console.log("checking global_resumeID", global_resumeID);


         
       //getFormRequestUrlYev = getFormRequestUrlYev.concat('"'+global_resume_filename+'"');

    //     var getFormRequestUrlMatt = ' http://18.219.52.10:5000/';
    // var getFormRequestUrlYev = ' http://107.23.87.29:8080/rawdata/';

          res.status(200).send( global_resumeID);

          // }

          // else console.log("didnt get 200 for LinkedIN post, got ", body);
        })
         .catch(function (err) {
                // Delete failed...
      console.log("FAIL for POST linkedIn ", err);
               
               
      }).finally(function () {
                      console.log("done with linkedIN POST");

                       });

    }

  });
}
