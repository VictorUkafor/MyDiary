import pg from 'pg';
import {} from 'dotenv/config';
import supertest from 'supertest';
import queries from '../server/models/queries';
import app from '..';

const request = supertest(app);
const connectionString = process.env.DATABASE_TEST_URL;
const client = new pg.Client(connectionString);

client.connect();

describe('MyDiary API Routes', () => {
  before((done) => {
    queries.beforeQueryForUser(client);
    done();
  });


  // Testing for 'POST /api/v1/auth/signup'
  describe('POST /api/v1/auth/signup', () => {
    // Creates a new user account successfully
    it('Creates a new user account successfully', (done) => {
      request.post('/api/v1/auth/signup')
        .send({
          firstName: 'Jean',
          lastName: 'Doe',
          email: 'jeandoe@gmail.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .expect(201)
        .end((err) => {
          done(err);
        });
    });

    // All fields are required
    it('All fields are required', (done) => {
      request.post('/api/v1/auth/signup')
        .send({})
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

    // Passwords did not match
    it('Passwords did not match', (done) => {
      request.post('/api/v1/auth/signup')
        .send({
          firstName: 'Jean',
          lastName: 'Doe',
          email: 'jeandoe@gmail.com',
          password: 'password',
          confirmPassword: 'password1',
        })
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

    // An account with this email has already been registered
    it('An account with this email has already been registered', (done) => {
      request.post('/api/v1/auth/signup')
        .send({
          firstName: 'Jean',
          lastName: 'Doe',
          email: 'jeandoe@gmail.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .expect(409)
        .end((err) => {
          done(err);
        });
    });
  });


  // Testing for 'POST /api/v1/auth/login'
  describe('POST /api/v1/auth/login', () => {
    // Logs a user into the app successfully
    it('Logs a user into the app successfully', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'jeandoe@gmail.com',
          password: 'password',
        })
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // both fields are required
    it('Both fields are required', (done) => {
      request.post('/api/v1/auth/login')
        .send({})
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

    // invalid email or password
    it('Invalid email or password', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'jeandoe1@gmail.com',
          password: 'password',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // invalid email or password
    it('Invalid email or password', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'jeandoe@gmail.com',
          password: 'password1',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });
  });
});

