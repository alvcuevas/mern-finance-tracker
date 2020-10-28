const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Intentando conectar con la DB');
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/blabla', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (err) {
    console.log(`Error al conectar con la DB: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
