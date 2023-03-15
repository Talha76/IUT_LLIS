const authenticateLeaveData = (req, res, next) => {
  const { studentContact, placeOfVisit, purposeOfVisit, contactPersonContact, departureDate, arrivalDate } = req.body;
  next();
}

const authenticateLateData = (req, res, next) => {
  const { studentContact, placeOfVisit, reason, accompanyingPersonContact, departureTime, arrivalTime } = req.body;
  console.log(studentContact, placeOfVisit, reason, accompanyingPersonContact, departureTime, arrivalTime);
  next();
}

module.exports = {
  authenticateLeaveData,
  authenticateLateData,
}
