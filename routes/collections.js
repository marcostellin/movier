const express = require('express');
const request = require('request');
const Movies = require('../models/movie');
const middlewares = require ('../middleware/index');
const router = express.Router();

/* GET index  */
router.get('/', middlewares.isLoggedIn, (req, res) => {
    Movies.find(function (err, movieList){
        if (err) {
            console.log (err);
        } else {
            res.render('collections/index', {movieList: movieList});
        }
    });
});

/* SHOW route */
router.get('/:id', middlewares.isLoggedIn, (req, res) => {
   Movies.findById (req.params.id, function(err, movie){
       if (err) {
           console.log (err);
       } else {
           console.log(movie);
           res.render ('collections/show', {movie: movie});
       }
   });
});

/* UPDATE route */
router.put('/:id', middlewares.isLoggedIn,  (req, res) => {
    Movies.findByIdAndUpdate (req.params.id, {'$set': {
                              'info.title': req.body.title,
                              'info.poster_path': req.body.poster_path,
                              'info.duration': req.body.duration,
                              'info.release_date': req.body.release_date,
                              'info.tagline': req.body.tagline,
                              'info.overview': req.body.overview
                              }
                             }, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/collections/' + req.params.id);
        }
    });
});

/* GET edit page */
router.get('/:id/edit', middlewares.isLoggedIn, (req, res) => {
    Movies.findById (req.params.id, function(err, movie){
        if (err) {
            console.log (err);
        } else {
            res.render ('collections/edit', {movie: movie});
        }
    });
});

/* NEW route */
router.post('/', middlewares.isLoggedIn, (req, res) => {
    res.locals.baseRequest(`/movie/${req.query.id}?api_key=${res.locals.apiKey}&language=en-US`, function (err, response, movieInfo){
        if (err) {
            console.log(err);
        } else {
            Movies.create ({_id: movieInfo.id, info: movieInfo}, function (err, info) {
                if (err) {
                    console.log (err);
                } else {
                    console.log ("Inserted Movie in DB!");
                    res.redirect (req.baseUrl + '/');
                }
            });
        }
    });
});

/* DELETE route */
router.delete('/:id', (req, res) => {
    Movies.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log (err);
        } else {
            res.redirect('/collections');
        }
    });
});

module.exports = router;