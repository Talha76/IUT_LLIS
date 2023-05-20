const adminModel = require('../models/hallAdmin.model');

describe('Admin model tests', () => {
  afterAll(() => adminModel.destroy() );

  test('User should get proper user fields', async () => {
    const user = await adminModel.getAdminById(1);
    expect(user.id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.role).toBeDefined();
  });
});
