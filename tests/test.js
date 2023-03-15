(async () => {
  const info = {
    id: 1,
    placeOfVisit: 'place1',
    purposeOfVisit: 'purpose1',
    departureDate: 'date1',
    arrivalDate: 'date2',
    studentContact: 'student contact',
    contactPersonContact: 'contact person contact'
  };
  try {
    const res = await studentModel.saveLeaveInfo(info.id, info);
    console.log(res);
  } catch (err) {
    console.log(err);
  }  
})();