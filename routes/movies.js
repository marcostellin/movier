const express = require('express');
const router = express.Router();

/* GET search page */
router.get('/search', (req, res) => {
    res.render('movies/search');
  });
  
/* GET results of search */
  router.get('/results/:page', (req, res) => {
    res.locals.baseRequest(`/search/movie?api_key=${res.locals.apiKey}&language=en-US&query=${encodeURI(req.query.q)}&page=${req.params.page}&include_adult=false`, function (err, response, body){
      if (err) {
        req.flash('error', 'Communication problem with TMDB.');
        res.redirect('/movies/search');
      }
      else if (req.query.q) {
        res.render('movies/results', {movies: body, query: req.query.q});
      } else {
        res.redirect('/movies/search');
      }
    });
});

router.get ('/:id', (req, res) => {
    res.locals.baseRequest(`/movie/${req.params.id}?api_key=${res.locals.apiKey}&language=en-US`, function (err, response, body){
        if (err) {
          req.flash('error', 'Communication problem with TMDB.');
          res.redirect('back');
        } else {
          res.render('movies/show', {movie: body});
        }
     });
});

module.exports = router;