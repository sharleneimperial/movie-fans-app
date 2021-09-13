const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});


router.get('/logout', (req, res)=> {
  req.logout();
  req.flash('success', 'logging out.. see you next time!');
  res.redirect('/');
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back..',
  failureFlash: 'Either email or password is incorrect'
}));

router.post('/signup', async(req, res) => {
  const { name, email, password } = req.body;

  try {
    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: { name, password }
    });
    if (created){
      console.log(`${User.name} was created`);
      const successObject = {
        successRedirect: '/',
        successFlash: `Welcome ${User.name}. Account was created.`
      }

      passport.authenticate('local', successObject)(req, res);
    }else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    
    }
    } catch (error){
      console.log('error')
      
      req.flash('error', 'Email or password is incorrect. Please Try again.');
      res.redirect('/auth/signup');
    }
  
})

module.exports = router;