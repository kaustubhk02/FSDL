const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const packageRoutes = require('./routes/packageRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send("This is Travel Agency Website");
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/travelDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use('/api', packageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});