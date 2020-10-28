const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
// const morgan = require('morgan');
const cors = require('cors');
// const connectDB = require('./config/db');
const mongoose = require('mongoose');
dotenv.config({ path: './config/config.env' });

// connectDB();

const app = express();
const transactionsRoutes = require('./routes/transactions');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/blabla', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));
}

app.use('/api/transactions', transactionsRoutes);
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log('MONGODB VAR', process.env.MONGO_URI);
});
