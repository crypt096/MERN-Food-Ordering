const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const items = require('./routes/api/items');
const orders = require('./routes/api/orders');
const foods = require('./routes/api/foods');

//Body parser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.log(err));

app.use('/api/items', items);
app.use('/api/orders', orders);
app.use('/api/foods', foods);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
