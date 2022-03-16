const indeed = require('indeed-scraper');
const { query } = require('express');
const db = require('../model');

const queryOptions = {
  host: 'www.indeed.com',
  query: 'JavaScript Software Engineer',
  city: 'Los Angeles, CA',
  radius: '25',
  level: 'entry_level',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: 10,
};

const indeedController = {};

indeedController.search = async (req, res, next) => {
  // get the location, title, and user from request query
  const { location, title, user } = req.query;
  queryOptions.city = location;
  queryOptions.query = title;
  // const queryString = 'SELECT * FROM user WHERE user=$1';
  const queryString =
    'SELECT * FROM user_jobs INNER JOIN job ON user_jobs.job_id=job.job_id WHERE username=$1';
  try {
    // get the list of jobs a user likes from db
    const arrOfUserLikedJobs = await db.query(queryString, [user]);
    // console.log(arrOfUserLikedJobs.rows);
    const arrOfLikedURL = arrOfUserLikedJobs.rows.map((likedJob) => likedJob.url);
    // console.log(arrOfLikedURL);
    const searchedJobs = await indeed.query(queryOptions);
    // use the URLs of the liked jobs to filter out those jobs from appearing in the returned job search
    const filteredJobs = searchedJobs.filter((job) => !arrOfLikedURL.includes(job.url));
    res.locals.jobs = filteredJobs;
    return next();
  } catch {
    return next({
      message: 'Error in the indeedController.search middleware',
      status: 500,
    });
  }
};

module.exports = indeedController;
