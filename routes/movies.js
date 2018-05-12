var express = require('express');
var router = express.Router();

/* GET index  */
router.get('/', function ( req, res ){
    res.render('movies/index');
});

router.get ('/:id', function (req, res) {
    res.locals.baseRequest(`/movie/${req.params.id}?api_key=${res.locals.apiKey}&language=en-US`, function (err, response, body){
        res.render('movies/show', {movie: body});
     });
});

module.exports = router;