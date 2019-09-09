var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config.' + process.env.NODE_ENV).serverConfig;
var app = express();

if (config.maintenanceMode) {
  app.get('/', function (req, res) {
    res.sendfile('maintenance.html', { root: __dirname + "/public" });
  });
}

if (config.behindHttps) {
  app.use(function (req, res, next) {
    if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    }
    else
      next();
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var compression = require('compression'); //comment these 2 lines in case you use nginx or other reverse proxy
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

var httpRequestLogger = require('./logging/httpRequestLogger');
app.use(httpRequestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var appLogger = require('./logging/appLogger');

var auth = require('./routes/auth');
var accounts = require('./routes/accounts');
var lookups = require('./routes/lookups');
var components=require('./routes/components');
var templates=require('./routes/templates');
var feeStructure=require('./routes/feeStructure');

app.use('/auth', auth);
app.use('/accounts', accounts);
app.use('/lookups', lookups);
app.use('/components',components);
app.use('/templates',templates);
app.use('/feeStructure',feeStructure);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;