import supertest from 'supertest';
import app from '../index';
import { expect } from 'chai';

const request = supertest(app);


describe('MyDiary API Routes', () => {
    beforeEach((done) => {
    // before each route
      done();
    });


    describe('GET /api/v1', () => {
        it('Displays the index page', (done) => {
          request.get('/api/v1')
            .expect(200)
            .end((err, res) => {
              const expected = { message: 'Welcome to MyDiary app!' };
              expect(res.body).to.eql(expected);
              done(err);
            });
        });
      });
    


});
  