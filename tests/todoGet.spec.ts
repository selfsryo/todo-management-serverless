import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const server = request('http://localhost:3000/local/');

describe('API — todoGet', () => {
    const initData = {
        createdAt: 1624880260099,
        id: '19af5cfa-76f2-467b-8b0f-778cb5e9a279',
        title: 'to get',
        user: 'get user',
        status: 'New',
        details: 'todo detail',
    };

    it('GET a specific todo', (done) => {
        server
            .get(`todo/${initData.user}/${initData.id}`)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                expect(Object.keys(result.body).length).equal(1);
                const res = result.body.result;
                expect(res.createdAt).to.equal(initData.createdAt);
                expect(res.id).to.equal(initData.id);
                expect(res.title).to.equal(initData.title);
                expect(res.user).to.equal(initData.user);
                expect(res.status).to.equal(initData.status);
                expect(res.details).to.equal(initData.details);
                return done();
            });
    });

    it('GET with invalid user', (done) => {
        server.get(`todo/dummyUser/${initData.id}`).expect(404).end(done);
    });

    it('GET with invalid id', (done) => {
        server.get(`todo/${initData.user}/dummyId`).expect(404).end(done);
    });
});
