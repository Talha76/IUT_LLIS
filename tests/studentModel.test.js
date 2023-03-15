const studentModel = require('../models/users/student.model');

describe('User model tests', () => {
  afterAll(() => {
    try {
      studentModel.destroy();
    } catch (err) {
      console.error(err);
    }
  });

  test('User should get proper user fields', async () => {
    try {
      const user = await studentModel.getStudentById(40);
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.department).toBeDefined();
      expect(user.gender).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.address).toBeDefined();
      expect(user.guardianName).toBeDefined();
      expect(user.guardianContact).toBeDefined();
      expect(user.roomNo).toBeDefined();
      expect(user.hallBlock).toBeDefined();
      expect(user.country).toBeDefined();
      expect(user.contactNo).toBeDefined();
      expect(user.password).toBeDefined();
    } catch (err) {
      console.error(err);
    }
  });

  test('saveLeaveInfo should insert leave info properly', async () => {
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
  });
});
