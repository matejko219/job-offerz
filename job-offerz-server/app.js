const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const initDbScript = require('./config/init-db-script');
const errorHandlers = require('./middlewares/error-handlers');
const appRoutes = require('./routes');
const bluebird = require('bluebird');

const app = express();

// database connection
mongoose.connect(config.dbUrl, { useMongoClient: true, promiseLibrary: bluebird });
mongoose.set('debug', app.get('env') === 'development');
initDbScript();

// set configuration object
app.set('config', config);

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
