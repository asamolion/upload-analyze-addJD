

const helmet = require('helmet');
var path = require('path');
const express = require('express');
const app = express();
const layout = require('express-layout');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

app.set('port', 8080);

// Call the multerImpl and pass in app state to it
const middleware = [
 helmet(),
layout(),
express.static('./'),

bodyParser.urlencoded(),
bodyParser.json(),
 validator(),
  cookieParser(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  flash(),

]

app.use(middleware);
require('./file-upload-server')(app);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.use(express.static('./'));


module.exports = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
  console.log('Visit http://localhost:' + app.get('port') + '/example/ to check out the upload example')
})