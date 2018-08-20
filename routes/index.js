const express = require('express');
const request = require('request');
const passport = require('passport');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  console.log(req.user);
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

/*GET login page */
router.get('/login', (req, res) => {
  res.render ('login');
});

/*POST login */
router.post('/login', passport.authenticate('login',{
  successRedirect: '/',
  failureRedirect: '/login'
}));

/*Logout */
router.get('/logout', (req, res) => {
  req.logout ();
  res.redirect ('/');
});

module.exports = router;
