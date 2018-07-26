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


      // Testing for GET /api/v1/entries
  describe('GET /api/v1/entries', () => {
    it('Gets all entries', (done) => {
      request.get('/api/v1/entries')
      .set('x-access-token', token)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // Entries can not be found
    it('Entries can not be found', (done) => {
      request.get('/api/v1/entry')
      .set('x-access-token', token)
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

      // User not authenticated to view entries
    it('User not authenticated to view entries', (done) => {
      request.get('/api/v1/entries')
      .set('x-access-token', 'token')
      .expect(404)
      .end((err) => {
        done(err);
      });
    });

  });

    // Testing for GET /api/v1/entries/<entryId>
    describe('GET /api/v1/entries/<entryId>', () => {
     // Entry can not be found
      it('Entry can not be found', (done) => {
        request.get('/api/v1/entries/10')
        .set('x-access-token', token)
          .expect(404)
          .end((err) => {
            done(err);
          });
      });
  
      // Gets a single entry
      it('Gets a single entry', (done) => {
        request.get(`/api/v1/entries/${fakeEntry.id}`)
        .set('x-access-token', token)
          .expect(200)
          .end((err) => {
            done(err);
          });
      });

      // User not authenticated to view an entry
      it('User not authenticated to view an entry', (done) => {
        request.get(`/api/v1/entries/${fakeEntry.id}`)
        .set('x-access-token', 'token')
        .expect(404)
        .end((err) => {
          done(err);
        });
      });

    });


      // Testing for 'POST /api/v1/entries
  describe('POST /api/v1/entries', () => {
    // Add a new diary entry
    it('Adds a new diary', (done) => {
      request.post('/api/v1/entries')
      .set('x-access-token', token)
        .send({
          title: 'My first bootcamp experience',
          content: 'I was so excited when i recieved . . .'
        })
        .expect(201)
        .end((err) => {
          done(err);
        });
    });

      // Content field must be filled
    it('Content field must be filled', (done) => {
      request.post('/api/v1/entries')
      .set('x-access-token', token)
        .send({
          title: 'My first bootcamp experience'
        })
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

      // User not authenticated to post an entry
      it('User not authenticated to post an entry', (done) => {
        request.post('/api/v1/entries')
        .set('x-access-token', 'token')
        .expect(404)
        .end((err) => {
          done(err);
        });
      });    

  });


    // Testing for 'PUT /api/v1/entries/<entryId>'
    describe('PUT /api/v1/entries/<entryId>', () => {
      // Modifies a diary entry
      it('Modifies a diary entry', (done) => {
        request.put(`/api/v1/entries/${fakeEntry.id}`)
        .set('x-access-token', token)
          .send({
            title: 'The full story',
            description: 'It all started when we decided to go . . .',
          })
          .expect(201)
          .end((err) => {
            done(err);
          });
      });
  
      // Entry can not be found
      it('Entry can not be found', (done) => {
        request.put('/api/v1/entries/10')
        .set('x-access-token', token)
          .send({
            title: 'The full story',
            description: 'It all started when we decided to go . . .',
          })
          .expect(404)
          .end((err) => {
            done(err);
          });
      });
      
      // User not authenticated to modify an entry
      it('User not authenticated to modify an entry', (done) => {
        request.put(`/api/v1/entries/${fakeEntry.id}`)
        .set('x-access-token', 'token')
        .expect(404)
        .end((err) => {
          done(err);
        });
      });
  
      });


        // Testing for 'DELETE /api/v1/entries/<entryId>'
  describe('DELETE /api/v1/entries/<entryId>', () => {
    // Entry can not be found
    it('Entry can not be found', (done) => {
      request.delete('/api/v1/entries/3')
      .set('x-access-token', token)
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Deletes an entry
    it('Deletes an entry', (done) => {
      request.delete(`/api/v1/entries/${fakeEntry.id}`)
      .set('x-access-token', token)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // User not authenticated to delete an entry
    it('User not authenticated to delete an entry', (done) => {
      request.delete(`/api/v1/entries/${fakeEntry.id}`)
      .set('x-access-token', 'token')
      .expect(404)
      .end((err) => {
        done(err);
      });
    });

  });


});
  