const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
// const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env' });

connectDB();

const transactionsRoutes = require('./routes/transactions');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));
}

app.use('/api/transactions', transactionsRoutes);
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log('MONGODB VAR', process.env.MONGO_URI);
});
