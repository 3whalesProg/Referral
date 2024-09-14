import request from 'supertest'
import app from '../index'

describe('AuthController', () => {
  describe('POST auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        firstName: "d",
        secondName: "Смирнов",
        thirdName: "fdsfsd",
        email: 'test2@example.com',
        password: 'password123',
      }

      const response = await request(app)
        .post('/api/auth/registration')
        .send(userData)

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
      expect(response.body).toHaveProperty('user')
      expect(response.body).toHaveProperty('jwt')
    })
  })
})