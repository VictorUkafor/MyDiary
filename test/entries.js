import supertest from 'supertest';
import { expect } from 'chai';
import data from '../server/dummy_data';
import app from '../index';

const request = supertest(app);


describe('MyDiary API Routes', () => {
    beforeEach((done) => {
    // before each route
      done();
    });


      // Testing for GET /api/v1/entries
  describe('GET /api/v1/entries', () => {
    it('Gets all entries', (done) => {
      request.get('/api/v1/entries')
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // Entries can not be found
    it('Entries can not be found', (done) => {
      request.get('/api/v1/entry')
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
        request.get('/api/v1/entries/1')
          .expect(404)
          .end((err) => {
            done(err);
          });
      });
  
      // Gets a single entry
      it('Gets a single entry', (done) => {
        request.get(`/api/v1/entries/${data.entries[0].id}`)
          .expect(200)
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
        .send({
          title: 'My first bootcamp experience'
        })
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

  });


    


});
  