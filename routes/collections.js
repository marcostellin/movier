const express = require('express');
const request = require('request');
const router = express.Router();

/* GET index  */
router.get('/', (req, res) => {
    res.render('collections/index');
});

module.exports = router;