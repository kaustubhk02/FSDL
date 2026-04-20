const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database 
mongoose
  .connect('mongodb://127.0.0.1:27017/doctorDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes 
const doctorRoutes      = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes        = require('./routes/userRoutes');

app.use('/', doctorRoutes);
app.use('/', appointmentRoutes);
app.use('/', userRoutes);

// Home
app.get('/', (req, res) => {
  res.render('pages/home');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.use((req, res) => {
  res.status(404).send('Page not found.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
