const express = require('express');
const request = require('request');
const passport = require('passport');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* GET signup page */
router.get ('/signup', (req, res) => {
  res.render('signup');
});

/* POST new user */
router.post('/signup', passport.authenticate ('signup', {
  successRedirect: '/',
  failureRedirect: '/signup'
}));

module.exports = router;
