const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.getLogin);
router.post('/login', userController.loginUser);
router.get('/signup', (req, res) => {
  res.render('pages/signup');
});

router.post('/signup', async (req, res) => {
  const { username, password, name, email, phone } = req.body;

  await User.create({ username, password, name, email, phone });

  res.redirect('/login');
});

module.exports = router;