const userController = {};

userController.getLiked = (req, res, next) => {
  const user = req.params.user;
  // query database searching for user and return list of liked jobs in res.locals.liked
};

userController.addLiked = (req, res, next) => {
  const user = req.params.user;
  // add the liked job to the user in the database
};

userController.updateStatus = (req, res, next) => {
  const user = req.params.user;
  const applicationID = req.params.user;
};

userController.deleteLiked = (req, res, next) => {
  const user = req.params.user;
  const applicationID = req.params.user;
};

module.exports = userController;
