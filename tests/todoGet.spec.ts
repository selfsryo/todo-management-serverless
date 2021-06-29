import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const server = request('http://localhost:3000/local/');

describe('API — todoGet', () => {
    const username = 'ryo';
    const id = '19af5cfa-76f2-467b-8b0f-778cb5e9a279';

    it('GET todo/{username}/{id}', (done) => {
        server
            .get(`todo/${username}/${id}`)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                console.log(result.body);
                expect(result.body).to.have.property('token');
                return done();
            });
    });
});
