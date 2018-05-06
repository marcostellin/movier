var express = require('express');
var router = express.Router();

/* GET index  */
router.get('/', function ( req, res ){
    res.render('movies/index');
}); 

module.exports = router;