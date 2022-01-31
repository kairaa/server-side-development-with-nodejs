var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter')

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => {
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//defining a secret key (it does not have to be meaningful)
app.use(cookieParser('12345-56890-09876-54321'));

app.use(auth);

//to test auth function, we open an incognito tab in our browser
//the reason is when we do not use incognito tab, browser cache
//username and password
function auth(req, res, next){
  console.log(req.signedCookies);

  //if the incoming request does not include the user field in the signed cookies
  //it means user does not authorized yet
  if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;

    //if authHeader is null
    if(!authHeader){
      var err = new Error('You are not authenticated');
      
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }

    //to extract username and password, it contains two item: username and password
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

    var username = auth[0];
    var password = auth[1];

    //if authentication succesful
    if(username === 'admin' && password === 'password'){
      //cookie setup
      // first parameter should be equal with !req.signedCookies.user 's user part
      res.cookie('user', 'admin', {signed: true})
      next();
    }
    else{
      var err = new Error('You are not authenticated');
      
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  }
  //if user authorized already
  else{
    if(req.signedCookies.user === 'admin'){
      //allows request
      next();
    }
    //user not authenticated
    else{
      var err = new Error('You are not authenticated');
      
      err.status = 401;
      return next(err);
    }
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//returns error message
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
