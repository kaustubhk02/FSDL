const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/doctorDB').then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/', doctorRoutes);
app.use('/', appointmentRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});