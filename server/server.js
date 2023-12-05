const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const socket = require('./config/socket');
const db = require('./config/db');
const routers = require('./routers');

const app = express();
app.use(cors());

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT;

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(routers);

const server = app.listen(PORT, () => {
  console.log(`🤖 : Server running in http://localhost:${PORT}`);
});

db();
socket(server);
