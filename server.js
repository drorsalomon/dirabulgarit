const mongoose = require('mongoose');
const app = require('./app.js');
const dotenv = require('dotenv');

/* Global handling of uncaught exceptions like undefined variables for example. The handling is 
   similar to the unhandled rejection. */
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('***** DB connection successful! *****'));

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

// Global handler for unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION OCCURRED! Shutting down the program...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
