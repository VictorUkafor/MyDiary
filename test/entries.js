import pg from 'pg';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import bcrypt from 'bcrypt';
import app from '..';
import key from '../server/models/key';


const request = supertest(app);
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/mydiary_dev';
const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync('password', salt)


let token;
let entryId;
describe('MyDiary API Routes', () => {
// let token;
// let entryId;
  before((done) => {
    pg.connect(connectionString, (err, client, done) => {
      client.query('TRUNCATE TABLE account CASCADE');
      client.query('TRUNCATE TABLE entry')
      .then(() => {
          client.query(`INSERT INTO account(firstName, lastName, email, password) 
          values($1, $2, $3, $4)`,['Ken', 'David', 'kendavid1@gmail.com', password]);
          client.query('SELECT * FROM account WHERE email=($1);', ['kendavid1@gmail.com'])
          .then(user => {
              const userId = user.rows[0].user_id;
              client.query(`INSERT INTO entry(entry_user_id, title, content) 
              values('${userId}', 'My first day at Bootcamp', 'It all started when . . .')`);
              client.query('SELECT * FROM entry WHERE entry_user_id=($1);', [userId])
              .then(entry => {
                  entryId = entry.rows[0].entry_id;
                  token = jwt.sign({ user_id: user.user_id }, key.secret, { expiresIn: 60 * 60 });    
                  console.log('tokennnnnnnnn', token);
                  console.log('entryIddddd', entryId);
                }).catch((err) => {
                    console.log(err);
                  });
            }).catch((err) => {
                console.log(err);
              });
        }).catch((err) => {
            console.log(err);
          });  
    });
    done();
});



                    



      // Testing for GET /api/v1/entries
  describe('GET /api/v1/entries', () => {
    console.log('token', token);
    console.log('entryId', entryId);
    it('Gets all entries', (done) => {
      request.get('/api/v1/entries')
      .set('authentication', token)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    it('Gets all entries', (done) => {
        request.get('/api/v1/entries')
        .set('authentication', token)
          .expect(200)
          .end((err) => {
            done(err);
          });
      });

    // User cannot be found
    it('Entries cannot be found', (done) => {
      request.get('/api/v1/entries')
      .set('authentication', '12376t567fryf')
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
        .set('authentication', token)
          .expect(404)
          .end((err) => {
            done(err);
          });
      });
  
      // Gets a single entry
      it('Gets a single entry', (done) => {
        request.get(`/api/v1/entries/${entryId}`)
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
      .expect(404)
      .end((err) => {
        done(err);
      });
    });

  });


});
  