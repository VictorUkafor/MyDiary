import pg from 'pg';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../index';
import key from '../server/models/key';

const request = supertest(app);
const connectionStringTest = process.env.DATABASE_URL || 'postgres://postgres:success4me@localhost:5432/mydiary_test';
const client = new pg.Client(connectionStringTest);
client.connect();

const user = client.query(`CREATE TABLE IF NOT EXISTS diaryUser(id SERIAL PRIMARY KEY,
  firstName VARCHAR(20) not null,
  lastName VARCHAR(20) not null, 
  email VARCHAR(40) not null, 
  password VARCHAR(255) not null)`);
user.on('end', () => { client.end(); });  

const salt = bcrypt.genSaltSync(10);
const encryptedPassword = bcrypt.hashSync("password", salt);
let token;

describe('MyDiary API Routes', () => {
  beforeEach((done) => {
    const table = client.query('DELETE * FROM diaryUser');
    table.on('end', () => { client.end(); }); 
    const addUser = client.query(`INSERT INTO diaryUser(firstName, lastName, email, password, confirm_password) 
    values("john", "doe", "victorukafor@gmail.com", encryptedPassword, encryptedPassword)`);
    addUser.on('end', () => { client.end(); });
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

     
  // // Testing for 'POST /api/v1/auth/signup'
  // describe('POST /api/v1/auth/signup', () => {
  //   // Creates a new user account successfully
  //     it('Creates a new user account successfully', (done) => {
  //       request.post('/api/v1/auth/signup')
  //         .send({
  //           firstName: 'John',
  //           lastName: 'Doe',
  //           email: 'johndoe@gmail.com',
  //           password: 'password',
  //           confirm_password: 'password',
  //         })
  //         .expect(201)
  //         .end((err) => {
  //           done(err);
  //         });
  //     });
  
  //     // All fields are required
  //     it('All fields are required', (done) => {
  //       request.post('/api/v1/auth/signup')
  //         .send({})
  //         .expect(400)
  //         .end((err) => {
  //           done(err);
  //         });
  //     });
  
  //     // Passwords did not match
  //     it('Passwords did not match', (done) => {
  //       request.post('/api/v1/auth/signup')
  //         .send({
  //           firstName: 'John',
  //           lastName: 'Doe',
  //           email: 'johndoe@gmail.com',
  //           password: 'password',
  //           confirm_password: 'password1',
  //         })
  //         .expect(400)
  //         .end((err) => {
  //           done(err);
  //         });
  //     });
  
  //     // An account with this email has already been registered
  //     it('An account with this email has already been registered', (done) => {
  //       request.post('/api/v1/auth/signup')
  //         .send({
  //           firstName: 'John',
  //           lastName: 'Doe',
  //           email: 'johndoe@gmail.com',
  //           password: 'password',
  //           confirm_password: 'password',
  //         })
  //         .expect(500)
  //         .end((err) => {
  //           done(err);
  //         });
  //     });
  //   }); 


  //   // Testing for 'POST /api/v1/login'
  // describe('POST /api/v1/login', () => {
  //   // Logs a user into the app successfully
  //   it('Logs a user into the app successfully', (done) => {
  //     request.post('/api/v1/login')
  //       .send({
  //         email: 'johndoe@gmail.com',
  //         password: 'password',
  //       })
  //       .expect(201)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // both fields are required
  //   it('Both fields are required', (done) => {
  //     request.post('/api/v1/login')
  //       .send({})
  //       .expect(400)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // invalid email or password
  //   it('Invalid email or password', (done) => {
  //     request.post('/api/v1/login')
  //       .send({
  //         email: 'john@gmail.com1',
  //         password: 'password',
  //       })
  //       .expect(404)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // invalid email or password
  //   it('Invalid email or password', (done) => {
  //     request.post('/api/v1/login')
  //       .send({
  //         email: 'johndoe@gmail.com',
  //         password: 'password1',
  //       })
  //       .expect(404)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });
  // });
    


});
  