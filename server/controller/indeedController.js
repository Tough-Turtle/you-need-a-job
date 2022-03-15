const queryOptions = {
  host: 'www.indeed.com',
  query: 'JavaScript Software Engineer',
  city: 'Los Angeles, CA',
  radius: '25',
  level: 'entry_level',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: 100,
};

const indeedController = {};

indeedController.search = (req, res, next) => {
  const { city, jobTitle } = req.body;
  queryOptions.city = city;
  queryOptions.query = jobTitle;

  indeed
    .query(queryOptions)
    .then((jobs) => {
      res.locals.jobs = jobs;
      // check if job url is in user's db and then add liked = true if it is, and false otherwise
      return next();
    })
    .catch((err) => {
      return next({
        message: 'Error in the indeedController.search middleware',
        status: 500,
      });
    });
};

module.exports = indeedController;
