//Beautify SHIFT+ALT+F
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var request = require('request');

var indexRoute = require('./routes/index');
var movieRoute = require('./routes/movies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Use statements
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//Set locals 
app.use(function (req, res, next) {
  res.locals.baseRequest = request.defaults({
    baseUrl: 'https://api.themoviedb.org/3/search/',
    json: true,
    timeout: 10000
  });

  res.locals.apiKey = '28ee83e89a622d7d0c2d51e7a0362bb1';
  next();
});

//Routes setup
app.use('/', indexRoute);
app.use('/movies', movieRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port " + process.env.PORT);
});