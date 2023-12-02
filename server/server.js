const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`🤖 : Server running in http://localhost:${PORT}`);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('🤖 : DB connected successfully');
  })
  .catch(err => {
    console.log(err.message);
  });
