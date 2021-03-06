//Beautify SHIFT+ALT+F
const createError               = require('http-errors');
const express                   = require('express');
const path                      = require('path');
const logger                    = require('morgan');
const request                   = require('request');
const mongoose                  = require('mongoose');
const bodyParser                = require('body-parser');
const methodOverride            = require('method-override');
const passport                  = require('passport');
const localStrategy             = require('passport-local').Strategy;
const expressSession            = require('express-session');
const flash                     = require('connect-flash');

const passportFunctions         = require('./configs/passport');

const indexRoute                = require('./routes/index');
const movieRoute                = require('./routes/movies');
const collectionRoute           = require('./routes/collections');

const app = express();

//Connect to the DB
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/movier");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Use statements
app.use(expressSession({
  secret: 'kfnalknlasnglasnflas',
  resave: false,              
  saveUninitialized: false,    //Prevent saving session of requests with no session cookie set
  cookie: {maxAge: 60000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//Set locals 
app.use(function (req, res, next) {
  res.locals.baseRequest = request.defaults({
    baseUrl: 'https://api.themoviedb.org/3/',
    json: true,
    timeout: 10000
  });

  res.locals.user = req.user;
  res.locals.apiKey = process.env.TMDB_KEY;
  res.locals.imgBaseUrl = 'https://image.tmdb.org/t/p/';
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

//Passport configuration
passport.serializeUser(passportFunctions.serializeUser);
passport.deserializeUser(passportFunctions.deserializeUser);
passport.use ('signup', new localStrategy (passportFunctions.verifySignup));
passport.use ('login', new localStrategy(passportFunctions.verifyLogin));

//Routes setup
app.use('/', indexRoute);
app.use('/movies', movieRoute);
app.use('/collections', collectionRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
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