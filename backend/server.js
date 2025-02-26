const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const todoRoutes = require('./todoRoutes');

const app = express()
app.use(cors());

app.use(express.json());

app.use('/todos', todoRoutes);

mongoose.connect('mongodb://localhost/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});