var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* GET search page */
router.get('/search', function (req, res){
  res.render('search');
});

/* GET results of search */
router.get('/results/:page', function (req, res){
  res.locals.baseRequest(`/search/movie?api_key=${res.locals.apiKey}&language=en-US&query=${encodeURI(req.query.q)}&page=${req.params.page}&include_adult=false`, function (err, response, body){
     res.render('results', {movies: body, query: req.query.q});
  });
});

module.exports = router;
