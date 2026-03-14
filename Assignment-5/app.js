const express = require('express');
const mongoose = require('mongoose');
const packageRoutes = require('./routes/packageRoutes');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("This is Travel Agency Website");
});

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/travelDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use('/api', packageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});