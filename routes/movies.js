const express = require('express');
const router = express.Router();

/* GET index  */
router.get('/', (req, res) => {
    res.render('movies/index');
});

/* GET search page */
router.get('/search', (req, res) => {
    res.render('search');
  });
  
/* GET results of search */
  router.get('/results/:page', (req, res) => {
    res.locals.baseRequest(`/search/movie?api_key=${res.locals.apiKey}&language=en-US&query=${encodeURI(req.query.q)}&page=${req.params.page}&include_adult=false`, function (err, response, body){
       res.render('results', {movies: body, query: req.query.q});
    });
});

router.get ('/:id', (req, res) => {
    res.locals.baseRequest(`/movie/${req.params.id}?api_key=${res.locals.apiKey}&language=en-US`, function (err, response, body){
        res.render('movies/show', {movie: body});
     });
});

module.exports = router;