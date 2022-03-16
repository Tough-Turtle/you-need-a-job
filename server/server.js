const path = require('path');
const express = require('express');
// const router = require('./router');
const cors = require('cors');
const app = express();
require('dotenv').config();
const axios = require('axios').default;
const port = process.env.PORT || 3001;

const indeedController = require('./controller/indeedController');
const userController = require('./controller/userController');
const callback = require('./callback.js');

app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/callback', callback, (req, res) => {
  res.redirect('http://localhost:8080');
});

// app.use(express.static('../client'));

// *********** TESTING FOR FRONT END
/*
app.get('/search', (req, res) => {
  const dummyJobs = [{
    date_posted: 'Tuesday', title: 'Monkey Manager', source: 'Indeed', company_name: 'Bronx Zoo', detail_url: 'https://uniqueurl1.com', location: 'Bronx', country: 'USA', state: 'NY', city: 'NY', description: 'Must have 2 years prior zookeeping experience. Monkey whispering preferred.'
  },
  {
    date_posted: 'Yesterday', title: 'Senior Cat Wranger', source: 'Indeed', company_name: 'Microsoft', detail_url: 'https://uniqueurl2.com', location: 'Seattle', country: 'USA', state: 'WA', city: 'Seattle', description: 'Looking for a famously patient person who can mostly just get a bunch of people in the same room at the same time.'
  }];

  console.log('search route');
  console.log('request query', req.query);
  res.status(200).header('Access-Control-Allow-Origin', "*").json(dummyJobs)
});

app.post('/user', (req, res) => {
  console.log('add favorite route');
  console.log('request body', req.body);
  res.status(200).header('Access-Control-Allow-Origin', "*").json(req.body)
});

app.delete('/user', (req, res) => {
  console.log('delete favorite route');
  console.log('request body', req.body);
  res.status(200).header('Access-Control-Allow-Origin', "*").json(req.body)
})

app.get('/user', (req, res) => {
  console.log('get all user favorites route');
  console.log('request query', req.query);
  res.status(200).header('Access-Control-Allow-Origin', "*").json(req.body)
})
*/
// ********************

app.post('/signin', userController.signin, (req, res) => {
  // serve the sign in page to the client
  res.status(200).json(res.locals.signin);
});

app.get('/', (req, res) => {
  res.send('hi from /');
});

// FINISHED !! search for jobs. returns a list of jobs that have not been liked by the user
app.get('/search', indeedController.search, (req, res) => {
  res.status(200).header('Access-Control-Allow-Origin', '*').json(res.locals.jobs);
});

// FINISHED !! return list of liked jobs
app.get('/user', userController.getLiked, (req, res) => {
  console.log('final user get middleware');
  res.status(200).header('Access-Control-Allow-Origin', '*').json(res.locals.liked);
  // res
  //   .status(200)
  //   .header('Access-Control-Allow-Origin', '*')
  //   .json([
  //     {
  //       _id: 1,
  //       postDate: 'just Posted',
  //       title: 'Software Engineer',
  //       company: 'Google',
  //       isEasyApply: false,
  //       salary: '$200,000',
  //       url: 'indeed.com/greatgooglejob',
  //       location: 'Mountain View, CA',
  //       summary: 'React whiz needed.',
  //       note: 'TBD',
  //       date_apply: undefined,
  //       status: 'Not Applied',
  //     },
  //     {
  //       _id: 2,
  //       postDate: 'post yesterday',
  //       title: 'Software Developer',
  //       company: 'Netflix',
  //       isEasyApply: false,
  //       salary: '$180,000',
  //       url: 'indeed.com/greatnextflixjob',
  //       location: 'Los Angeles, CA',
  //       summary: 'Redux whiz needed.',
  //       note: 'TBD',
  //       date_apply: '3/10/22',
  //       status: 'Onsite',
  //     },
  //   ]);
});

// FINISHED !! add a liked job posting for a user
app.post('/user', userController.addLiked, (req, res) => {
  res.status(200).header('Access-Control-Allow-Origin', '*').json(res.locals.addSuccess);
});

// FINISHED !! update a liked job's status for a user
app.patch('/user', userController.update, (req, res) => {
  res.sendStatus(200);
});

// app.delete('/user', userController.delete, (req, res) => {});

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
  console.log(error.message, err);
  res.status(error.status).send(error.message);
});

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
