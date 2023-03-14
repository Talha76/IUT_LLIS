const bcrypt =require("bcryptjs");
const passport = require("passport");

const getIndex = (req, res) => {
    res.render("login.ejs");
};

const postIndex = (req, res, next) => {
   passport.authenticate('local',{
         successRedirect:'/student/dashboard',
         failureRedirect:'/',
         failureFlash: true,
   })(req, res, next);
};

module.exports = {
    getIndex,
    postIndex,
};
