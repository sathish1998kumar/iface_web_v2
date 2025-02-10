const request = require('supertest');
const app = require('../app'); 

const testErrorResponse = async (field, value, expectedMsg) => {
    // console.log(field);
  const response = await request(app)
    .put('/api/users/update')
    .send({ [field]: value });

  expect(response.status).toBe(400);
  expect(response.body.errors).toContainEqual(expect.objectContaining({
    msg: expectedMsg,
    path: field
  }));
};

describe('API Tests', () => {
  it('POST /api/users/login - should return a token', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: "sathish@gamil.com", password: '123456' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
  });

  it('POST /api/users/login - should return error for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: "sathish@gamil.com", password: "1234567" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('PUT /api/users/update - should update the user and return success message', async () => {
    const response = await request(app)
      .put('/api/users/update')
      .send({
        age: "70",
        name: 'saratha',
        email: "saratha@gmail.com",
        gender: "female",
        mobile: "1234567890",
        id: "45"
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Updated Successfully');
  });

  it('should return error for invalid age', async () => {
    await testErrorResponse('age', 'invalid age', 'Age must be a number');
  });

  it('should return error for empty name', async () => {
    await testErrorResponse('name', '', 'Name is required');
  });

  it('should return error for invalid email', async () => {
    await testErrorResponse('email', 'invalid-email', 'Email is invalid');
  });

  it('should return error for invalid mobile number', async () => {
    const response = await request(app)
      .put('/api/users/update')
      .send({
        mobile: '1234567890aa',
        name: 'saratha',
        email: 'saratha@gmail.com',
        gender: 'female',
        age: '45',
        id: '45'
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Mobile number must contain only digits',
      path: 'mobile'
    }));
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Mobile number must be exactly 10 digits',
      path: 'mobile'
    }));
  });

  it('should return error for missing id', async () => {
    await testErrorResponse('id', '', 'ID is required');
  });

  it('should return error for invalid gender', async () => {
    await testErrorResponse('gender', 'invalid-gender', 'Gender must be male, female, or other');
  });
});
