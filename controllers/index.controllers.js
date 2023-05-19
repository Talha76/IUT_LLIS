const passport = require("passport");

const getIndex = (req, res) => {
  res.render("login.ejs", {
    error: req.flash('error'),
    success: req.flash('success'),
  });
};

const postIndex = (req, res, next) => {
  passport.authenticate('local1', {
    successRedirect:'/student/dashboard',
    failureRedirect:'/',
    successFlash: true,
    failureFlash: true,
  })(req, res, next);
};

module.exports = {
  getIndex,
  postIndex,
};
