import supertest from 'supertest';
import app from '../index';
import { expect } from 'chai';

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



    


});
  