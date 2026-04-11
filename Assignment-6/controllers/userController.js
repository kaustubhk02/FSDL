const User = require('../models/userModel');

// GET /login
exports.getLogin = (req, res) => {
  res.render('pages/login', { error: null });
};

// POST /login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render('pages/login', { error: 'Username and password are required.' });
    }

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.render('pages/login', { error: 'Invalid username or password.' });
    }

    req.session.user = {
      _id: user._id,
      username: user.username,
      name: user.name,
      role: user.role
    };

    res.redirect('/');

  } catch (err) {
    console.error('loginUser error:', err);
    res.status(500).send('Login failed. Please try again.');
  }
};

// GET /signup
exports.getSignup = (req, res) => {
  res.render('pages/signup', { error: null });
};

// POST /signup — shows real error on screen for debugging
exports.signupUser = async (req, res) => {
  try {
    const { username, password, name, email, phone } = req.body;

    console.log('Signup form data received:', { username, name, email, phone });

    if (!username || !password || !name) {
      return res.render('pages/signup', { error: 'Username, password, and name are required.' });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.render('pages/signup', { error: 'Username already taken. Please choose another.' });
    }

    const newUser = await User.create({ username, password, name, email, phone });
    console.log('User created:', newUser._id);

    res.redirect('/login');

  } catch (err) {
    // Shows the REAL error on screen
    console.error('signupUser error:', err);
    res.status(500).send(`
      <h2 style="color:red;">Signup Error — Debug Info</h2>
      <p><strong>Error Name:</strong> ${err.name}</p>
      <p><strong>Message:</strong> ${err.message}</p>
      <pre style="background:#f4f4f4;padding:12px;">${JSON.stringify(err.errors || err, null, 2)}</pre>
      <a href="/signup">← Go back to Signup</a>
    `);
  }
};