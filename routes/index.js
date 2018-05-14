const express = require('express');
const request = require('request');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
