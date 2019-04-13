import pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'dotenv/config';
import supertest from 'supertest';
import queries from '../server/models/queries';
import app from '..';

const request = supertest(app);
const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync('password', salt);
const connectionString = process.env.DATABASE_TEST_URL;
const client = new pg.Client(connectionString);

client.connect();

describe('MyDiary API Routes', () => {
  before((done) => {
    queries.beforeQueriesForEntries(client, password);
    done();
  });

  const entryId = 1;
  const token = jwt.sign({ user_id: '1' }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

  // Testing for GET /api/v1/entries
  describe('GET /api/v1/entries', () => {
    it('Gets all entries', (done) => {
      request.get('/api/v1/entries')
        .set('authentication', token)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // User not authenticated to view entries
    it('User not authenticated to view entries', (done) => {
      request.get('/api/v1/entries')
        .set('authentication', '12376t567fryf')
        .expect(401)
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
        .set('authentication', token)
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Gets a single entry
    it('Gets a single entry', (done) => {
      request.get('/api/v1/entries/1')
        .set('authentication', token)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // User not authenticated to view an entry
    it('User not authenticated to view an entry', (done) => {
      request.get(`/api/v1/entries/${entryId}`)
        .set('authentication', 'token')
        .expect(401)
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
        .set('authentication', token)
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
        .set('authentication', token)
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
        .set('authentication', '165575gvfcghc')
        .send({
          content: 'My first bootcamp experience'
        })
        .expect(401)
        .end((err) => {
          done(err);
        });
    });
  });


  // Testing for 'PUT /api/v1/entries/<entryId>'
  describe('PUT /api/v1/entries/<entryId>', () => {
    // Modifies a diary entry
    it('Modifies a diary entry', (done) => {
      request.put(`/api/v1/entries/${entryId}`)
        .set('authentication', token)
        .send({
          title: 'The full story',
          description: 'It all started when we decided to go . . .',
        })
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // Entry can not be found
    it('Entry can not be found', (done) => {
      request.put('/api/v1/entries/10')
        .set('authentication', token)
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
      request.put(`/api/v1/entries/${entryId}`)
        .set('authentication', 'NBCFNDB34Y7B')
        .expect(401)
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
        .set('authentication', token)
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Deletes an entry
    it('Deletes an entry', (done) => {
      request.delete(`/api/v1/entries/${entryId}`)
        .set('authentication', token)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // User not authenticated to delete an entry
    it('User not authenticated to delete an entry', (done) => {
      request.delete(`/api/v1/entries/${entryId}`)
        .set('authentication', '376gdbjyh')
        .expect(401)
        .end((err) => {
          done(err);
        });
    });
  });

  // Testing for 'GET /api/v1/user'
  describe('GET /api/v1/user', () => {
    it('Returns user\'s profile', (done) => {
      request.get('/api/v1/user')
        .set('authentication', token)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });
  });
});

