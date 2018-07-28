import supertest from 'supertest';
import { expect } from 'chai';
import app from '../index';

const request = supertest(app);

describe('MyDiary API Routes', () => {
  beforeEach((done) => {

    done();
  }); 


    describe('GET /api/v1', () => {
        it('Displays the welcome message', (done) => {
          request.get('/api/v1')
            .expect(200)
            .end((err, res) => {
              const expected = { message: 'Welcome to MyDiary app!' };
              expect(res.body).to.eql(expected);
              done(err);
            });
        });
      });


  // Testing for 'POST /api/v1/auth/signup'
  describe('POST /api/v1/auth/signup', () => {
    // Creates a new user account successfully
      it('Creates a new user account successfully', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'password',
            confirm_password: 'password',
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
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'password',
            confirm_password: 'password1',
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
            firstName: "Smith",
            lastName: "Josh",
            email: "smithjosh@gmail.com",
            password: 'password',
            confirm_password: 'password',
          })
          .expect(400)
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
          email: "smithjosh@gmail.com",
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
      request.post('/api/v1/login')
        .send({
          email: "smithjosh1@gmail.com",
          password: 'password',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // invalid email or password
    it('Invalid email or password', (done) => {
      request.post('/api/v1/login')
        .send({
          email: "smithjosh@gmail.com",
          password: 'password1',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });
  });
    


});
  