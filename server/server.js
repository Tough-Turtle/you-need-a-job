const path = require('path');
const express = require('express');
// const router = require('./router');
const app = express();
require('dotenv').config();
const axios = require('axios').default;
const port = process.env.PORT || 3001;

const indeedController = require('./controller/indeedController');
const userController = require('./controller/userController');

app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi from /');
});

app.get('/signin', (req, res) => {
  // serve the sign in page to the client
  res.status(200).send('send the homepage to the client');
});

// search for jobs
app.get('/search', indeedController.search, (req, res) => {
  res.status(200).json(res.locals.jobs);
  // res.send('hi from /search');
});

// return list of liked jobs
app.get('/:user', userController.getLiked, (req, res) => {
  res.status(200).json(res.locals.liked);
});

// add a liked job posting for a user
app.post('/:user', userController.addLiked, (req, res) => {});

// update a liked job's status for a user
app.patch('/:user/:applicationID', userController.updateStatus, (req, res) => {});

app.delete('/:user/:applicationID', userController.deleteLiked, (req, res) => {});

// local error handler
app.use((req, res) => {
  res.status(404).send('ERROR 404 - Page not found');
});

// global error handler
app.use((err, req, res, next) => {
  const errHandler = {
    message: 'Error caught in unknown middleware',
    status: 500,
  };
  const error = Object.assign({}, errHandler, err);
  console.log(error.message);
  res.status(error.status).send(error.message);
});

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
