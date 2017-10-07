var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var environments = require('./config/environments');
var config = require('./config/config');
var initDbScript = require('./config/init-db-script');
var errorHandlers = require('./middlewares/error-handlers');

var appRoutes = require('./routes');

var app = express();

// database connection
mongoose.connect(environments.dbUrl, { useMongoClient: true, promiseLibrary: global.Promise });
mongoose.set('debug', app.get('env') === 'development');
initDbScript();

// set configuration objects
app.set('config', config);
app.set('environments', environments);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', appRoutes);

// catch 404 and forward to error handlers
app.use(errorHandlers.notFoundHandler);
// error handlers
app.use(errorHandlers.logError);
app.use(errorHandlers.apiErrorHandler);
app.use(errorHandlers.errorHandler);

module.exports = app;
