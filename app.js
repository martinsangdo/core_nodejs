
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
    , vocabulary = require('./routes/vocabulary')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path');

var restResponse = require('express-rest-response');

var app = express();

var DB_URL = "mongodb://localhost:27017/martin_projects";

//Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(DB_URL, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

//========== define Rest response
var rest_resp_options = {
  showStatusCode: true,
  showDefaultMessage: true
};
app.use(restResponse(rest_resp_options));

// all environments
app.set('port', process.env.PORT || 3001);		//3000 default port
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.use('/', routes);
// app.get('/', routes.index);
app.get('/users', user.getuser);
app.get('/vocabulary', vocabulary);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
