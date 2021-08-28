var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');

var session = require('express-session');
var flash = require('connect-flash');

const bcrypt = require('bcrypt');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('./middleware/auth_user');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var apisRouter = require('./routes/apis');
var usersRouter = require('./routes/users');
var connectDB=require('./config');
const configkeys = require("./config/default.json");
var utils = require('./config/utils');

var app = express();
var exphbs = hbs.create({
  helpers: {
    ifCond: function (v1, operator, v2, options) {
      v1=JSON.stringify(v1);
      v2=JSON.stringify(v2);

      switch (operator) {
          case '==':
              return (v1 == v2) ? options.fn(this) : options.inverse(this);
          case '===':
              return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '!=':
              return (v1 != v2) ? options.fn(this) : options.inverse(this);
          case '!==':
              return (v1 !== v2) ? options.fn(this) : options.inverse(this);
          case '<':
              return (v1 < v2) ? options.fn(this) : options.inverse(this);
          case '<=':
              return (v1 <= v2) ? options.fn(this) : options.inverse(this);
          case '>':
              return (v1 > v2) ? options.fn(this) : options.inverse(this);
          case '>=':
              return (v1 >= v2) ? options.fn(this) : options.inverse(this);
          case '&&':
              return (v1 && v2) ? options.fn(this) : options.inverse(this);
          case '||':
              return (v1 || v2) ? options.fn(this) : options.inverse(this);
          default:
              return options.inverse(this);
      }
    }
    // jprs: function (str) {
    //   return JSON.parse(JSON.stringify(str));
    // }
    // ifCond: function(v1, v2, options) {
    //   if(v1 === v2) {
    //     return options.fn(this);
    //   }
    //   return options.inverse(this);
    // }
  },
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/layouts/'
});
app.engine('hbs', exphbs.engine);
// view engine setup
//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}));

app.use(flash());

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  //res.locals.user = req.flash('user');
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.siteurl = configkeys.siteurl;
  //res.locals.messages = require('express-messages')(req, res);
  next();
});

app.all('*', function (req, res, next) {
  if (req.path == '/' || req.path == '/login' || req.path.startsWith("/api/") || req.path.startsWith("/apis/") || req.path.startsWith("/users/")){
    return next();
  }
  ensureAuthenticated(req, res, next);
  //next();
});
//lg

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/apis', apisRouter);
app.use('/users', usersRouter);

connectDB();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.errmessage = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('uncaughtException', function (err) {
  console.error('An uncaught error occurred!');
  console.error(err);
  console.error(err.stack);
  utils.logException(err,null,"uncaughtException");
  //process.exit(1);
});

module.exports = app;
