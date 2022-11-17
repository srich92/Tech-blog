const router = require('express').Router();
const session = require('express-session');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
    
      res.status(200).json(userData);
    });
    if (session.userId) {
      res.render('login');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      console.log('LOGGED IN: ' + req.session.loggedIn);
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/login');
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
  res.redirect('/');
});

module.exports = router;
