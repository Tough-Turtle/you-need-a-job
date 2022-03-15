const path = require('path');
const express = require('express');
// const router = require('./router');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const indeed = require('indeed-scraper');

const queryOptions = {
  host: 'www.indeed.com',
  query: 'JavaScript Software Engineer',
  city: 'Los Angeles, CA',
  radius: '25',
  level: 'entry_level',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: 100
};

// From Rapid API
const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://job-search4.p.rapidapi.com/monster/search',
  params: {query: 'Software Engineer', state: 'CA', page: '1'},
  headers: {
    'x-rapidapi-host': 'job-search4.p.rapidapi.com',
    'x-rapidapi-key': '3900315a03msh16f7ce929516f14p1ce54djsn15145610ca19'
  }
};

// fetch('/rapid')

app.use(express.json());

// app.use(express.static('../client'));

app.get('/rapid', (req, res) => {
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  res.status(200);
})

// app.get('/', (req, res) => {
//   // indeed.query(queryOptions).then(res => {
//   //   console.log(res); // An array of Job objects
//   // });
//   // res.status(200).send();
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

app.use((req, res) => {
  console.log('Error: page not found')
  res.status(400).send('Error: page not found');
});

app.use((err, req, res, next) => {
if (!err) err = {
  log: 'Express error handler caught unknown middleware',
  message: { err: 'An unknown error occurred'},
};
console.log(err);
return res.status(500).json(err);
});

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
