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
  const { title, summary, url, company, postDate, salary, isEasyApply, user } = req.body;
  const fields = [title, summary, url, company, postDate, salary, isEasyApply];
  const checkQueryString = 'SELECT * FROM "public"."job" WHERE url = $1;';
  const checkedJob = await db.query(queryString, [url]);
  // check for checkJob.rows.length;
  if (!checkedJob.rows.length) {
    const insertQueryString =
      'INSERT INTO "public"."job" (title, summary, url, post_date, salary, is_easy_apply) VALUES ($1, $2, $3, $4, $5, $6, $7);';
    const likedJob = await db.query(queryString, fields);
  }
  const addToLikedJobsQuery =
    'INSERT INTO "public"."user_jobs"(username, job_id, note, date_applied, status) VALUES ($1, $2, $3, $4, $5)';

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
