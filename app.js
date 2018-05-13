//Beautify SHIFT+ALT+F
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const request = require('request');

const indexRoute = require('./routes/index');
const movieRoute = require('./routes/movies');

const app = express();

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
    baseUrl: 'https://api.themoviedb.org/3/',
    json: true,
    timeout: 10000
  });

  res.locals.apiKey = process.env.TMDB_KEY;
  res.locals.imgBaseUrl = 'https://image.tmdb.org/t/p/';
  next();
});

//Routes setup
app.use('/', indexRoute);
app.use('/movies', movieRoute);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});