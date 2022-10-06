require('dotenv').config()

const userAuth = require('./routes/auth');
const usersApi = require('./routes/user');
const sketchesApi = require('./routes/sketch');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

//main
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://anuj:AfB5gyO6X2Xt8wuP@cluster0.easrnqk.mongodb.net/test");
  app.listen(port, () => {
      console.info(`Listening on port http://localhost:${port}`);
  });
}

//auth
app.use('/auth', userAuth);

//users 
app.use('/users', usersApi);

//sketches
app.use('/sketches', sketchesApi);