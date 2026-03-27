const User = require('../models/userModel');

exports.getLogin = (req, res) => {
  res.render('pages/login');
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.render('pages/login', {
      error: "Invalid credentials"
    });
  }
};