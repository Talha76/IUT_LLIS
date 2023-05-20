const passport = require("passport");

const authenticateLeaveData = (req, res, next) => {
  const { studentContact, placeOfVisit, purposeOfVisit, contactPersonContact, departureDate, arrivalDate } = req.body;
  req.body.purposeOfVisit = (purposeOfVisit === 'others' ? req.body.othersDescription : purposeOfVisit);
  next();
}

const authenticateLateData = (req, res, next) => {
  const { studentContact, placeOfVisit, lateReason, accompanyingPersonContact, departureTime, arrivalTime } = req.body;
  req.body.lateReason = (lateReason === 'others' ? req.body.othersDescription : lateReason);
  next();
}

const indexPassportAuth = (req, res, next) => {
  passport.authenticate('localStudent', {
    failureRedirect:'/',
    failureFlash: true
  })(req, res, next);
}

const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    return next();
  }

  req.flash('error', 'Access Denied!');
  res.send(403).send('Unauthorized');
}

module.exports = {
  authenticateLeaveData,
  authenticateLateData,
  indexPassportAuth,
  isStudent
}
