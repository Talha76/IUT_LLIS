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

module.exports = {
  authenticateLeaveData,
  authenticateLateData,
}
