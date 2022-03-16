const userController = {};
const { query } = require('express');
const db = require('../model');

userController.getLiked = async (req, res, next) => {
  console.log('in get liked');
  const { user } = req.query;
  console.log(user);
  const queryString =
    'SELECT * FROM user_jobs INNER JOIN job ON user_jobs.job_id=job.job_id WHERE username=$1';
  try {
    const likedJobs = await db.query(queryString, [user]);
    res.locals.liked = likedJobs.rows;
    return next();
  } catch {
    return next({
      message: 'Error in the userController.getLiked middleware',
      status: 500,
    });
  }
  // query database searching for user and return list of liked jobs in res.locals.liked
};

// add the liked job to the user in the database
userController.addLiked = async (req, res, next) => {
  const { user } = req.query;
  const { title, summary, url, company, postDate, salary, isEasyApply } = req.body;
  const fields = [title, summary, url, company, postDate, salary, isEasyApply];
  const checkQueryString = 'SELECT * FROM "public"."job" WHERE url = $1;';

  // check if the liked job is in the list of jobs
  const checkedJob = await db.query(checkQueryString, [url]);
  console.log(checkedJob);
  // if it isn't insert it into the database
  if (!checkedJob.rows.length) {
    const insertQueryString =
      'INSERT INTO "public"."job" (title, summary, url, company, post_date, salary, is_easy_apply) VALUES ($1, $2, $3, $4, $5, $6, $7);';
    const likedJob = await db.query(insertQueryString, fields);
    console.log(likedJob);
  }

  // add the liked job to the user_jobs db with the user's name
  const addToLikedJobsQuery =
    'INSERT INTO "public"."user_jobs"(username, job_id, note, date_applied, status) VALUES ($1, $2, $3, $4, $5)';

  res.send('back from addliked!');
  // insert into public.user_jobs with user id
};

userController.updateStatus = (req, res, next) => {
  const user = req.params.user;
  const applicationID = req.params.user;
};

// userController.deleteLiked = (req, res, next) => {
//   const user = req.params.user;
//   const applicationID = req.params.user;
// };

module.exports = userController;
