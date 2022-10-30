const app = require('../../app');
const User = require('../../models/User');
const request = require('supertest').agent(app);

const userCredentials = {
  email: 'joedoe@mail.com',
  password: '123456',
  name: 'Joe Doe'
}

describe('POST /signup', () => {
  it('should create a new user', async () => {
    const credentials = { ...userCredentials };
    const res = await request.post('/signup').send(credentials);
    expect(res.status).toBe(201);
    expect(res.body).hasOwnProperty('success', true);
    expect(res.body).hasOwnProperty('token');

    const user = await User.findOne({ email: credentials.email });
    expect(user).not.toBeNull();
    expect(user).toHaveProperty('email', credentials.email);
    expect(user).toHaveProperty('password');
  });
});

describe('POST /login', () => {
  it('should login a user', async () => {
    const credentials = { ...userCredentials };
    delete credentials.name;
    const res = await request.post('/login').send(credentials);
    expect(res.status).toBe(200);
    expect(res.body).hasOwnProperty('success', true);
    expect(res.body).hasOwnProperty('token');
  });
});