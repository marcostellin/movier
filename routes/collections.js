const express = require('express');
const request = require('request');
const Movies = require('../models/movie');
const router = express.Router();

/* GET index  */
router.get('/', (req, res) => {
    Movies.find(function (err, movieList){
        if (err) {
            console.log (err);
        } else {
            res.render('collections/index', {movieList: movieList});
        }
    });
});

router.post('/', (req, res) => {
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

module.exports = router;