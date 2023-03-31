const studentModel = require('../models/users/student.model');

describe('User model tests', () => {
  afterAll(() => {
    studentModel.destroy();
  });

  test('User should get proper user fields', async () => {
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
  });
});
