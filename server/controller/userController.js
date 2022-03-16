const userController = {};
const { query } = require('express');
const db = require('../model');

userController.signin = async (req, res, next) => {
  console.log('usercontroller body:', req.body);
  try {
    const { user } = req.body;
    const queryString = 'SELECT * FROM "public"."user" WHERE username=$1';
    const userOnDB = await db.query(queryString, [user]);
    // if user already exist on the db, return next w/o
    if (userOnDB.rows.length) {
      res.locals.signin = true;
      return next();
    }
    const createUserString = 'INSERT INTO "public"."user" (username) VALUES ($1)';
    const createUser = await db.query(createUserString, [user]);
    res.locals.signin = true;
    return next();
  } catch {
    return next({
      message: 'Error in the userController.signin middleware',
      status: 500,
    });
  }
};

userController.getLiked = async (req, res, next) => {
  const { user } = req.query;
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
  // console.log('REQ BODY: ', req.body);
  const fields = [title, summary, url, company, postDate, salary, isEasyApply];
  const checkQueryString = 'SELECT * FROM "public"."job" WHERE url = $1;';

  try {
    // check if the liked job is in the list of jobs
    const checkedJob = await db.query(checkQueryString, [url]);
    // if it isn't insert it into the database
    if (!checkedJob.rows.length) {
      const insertQueryString =
        'INSERT INTO "public"."job" (title, summary, url, company, post_date, salary, is_easy_apply) VALUES ($1, $2, $3, $4, $5, $6, $7);';
      const likedJob = await db.query(insertQueryString, fields);
      console.log('added a new job into DB');
    }
    const jobIDquery = 'SELECT job_id FROM "public"."job" WHERE url=$1';
    const jobIDsearch = await db.query(jobIDquery, [url]);
    const jobID = jobIDsearch.rows[0].job_id;

    // check the database to see if user has already liked the job, if he has then ignore the request
    const checkDoubleLikeQuery =
      'SELECT * FROM "public"."user_jobs" WHERE username=$1 AND job_id=$2';
    const checkDoubleLikeValues = [user, jobID];
    const doubleLikes = await db.query(checkDoubleLikeQuery, checkDoubleLikeValues);

    // if there's 1 or more of a user : job link, there's no need to like again..return next()
    if (doubleLikes.rows.length >= 1) {
      res.locals.addSuccess = false;
      return next();
    }

    // if there isn't a user:job link, add it to the user_jobs table
    const addToLikedJobsQueryString =
      'INSERT INTO "public"."user_jobs"(username, job_id, note, status) VALUES ($1, $2, $3, $4)';
    const addToLikedJobsQueryValues = [user, jobID, 'Add notes...', 'not yet applied'];
    await db.query(addToLikedJobsQueryString, addToLikedJobsQueryValues);
    res.locals.addSuccess = true;
    return next();
  } catch {
    return next({
      message: 'Error in the userController.addLiked middleware',
      status: 500,
    });
  }
};

userController.update = async (req, res, next) => {
  const { _id, status, note, date_applied } = req.body;
  try {
    const updateQueryString =
      'UPDATE "public"."user_jobs" SET note=$1, status=$2, date_applied=$3 WHERE _id=$4 RETURNING *';
    const updateQueryValues = [note, status, date_applied, _id];
    const update = await db.query(updateQueryString, updateQueryValues);
    res.json(update);
    // send back status 200 on successful update
  } catch {
    return next({
      message: 'Error in the userController.update middleware',
      status: 500,
    });
  }
};

userController.deleteLiked = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const deleteQueryString = 'DELETE FROM "public"."user_jobs" WHERE _id=$1';
    const deleted = await db.query(deleteQueryString, [_id]);
    if (deleted) console.log('deleted');
    return next();
  } catch {
    return next({
      message: 'Error in the userController.update middleware',
      status: 500,
    });
  }
};

module.exports = userController;
