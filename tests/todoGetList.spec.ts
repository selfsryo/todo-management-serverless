import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const server = request('http://localhost:3000/local/');

describe('API — todoGetList', () => {
    const initData1 = {
        createdAt: 1624880260099,
        id: '19af5cfa-76f2-467b-8b0f-778cb5e9a279',
        title: 'to get',
        user: 'get user',
        status: 'New',
        details: 'todo detail',
    };
    const initData2 = {
        createdAt: 1624880644095,
        id: '3a0530d2-0fe2-40e5-b322-3ac3a4eadf67',
        title: 'to get',
        user: 'get user',
        status: 'Working',
        details: 'todo detail',
    };

    it('GET todo list', (done) => {
        server
            .get(`todo/${initData1.user}/`)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                const res = result.body.result;
                expect(res.length).equal(2);
                expect(res[0].createdAt).to.equal(initData1.createdAt);
                expect(res[0].id).to.equal(initData1.id);
                expect(res[0].title).to.equal(initData1.title);
                expect(res[0].user).to.equal(initData1.user);
                expect(res[0].status).to.equal(initData1.status);
                expect(res[1].createdAt).to.equal(initData2.createdAt);
                expect(res[1].id).to.equal(initData2.id);
                expect(res[1].title).to.equal(initData2.title);
                expect(res[1].user).to.equal(initData2.user);
                expect(res[1].status).to.equal(initData2.status);
                return done();
            });
    });

    it('GET with invalid user', (done) => {
        server.get('todo/dummyUser/').expect(404).end(done);
    });
});
