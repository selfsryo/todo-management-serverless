import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const server = request('http://localhost:3000/local/');

describe('API — todoPut', () => {
    it('update title', (done) => {
        const initData = {
            createdAt: 1625065388887,
            id: '8c4d0454-6350-4846-99e6-653d244801ae',
            user: 'put user',
            status: 'New',
            details: 'todo detail',
        };
        const putData = {
            title: 'After update',
        };
        server
            .put(`todo/${initData.user}/${initData.id}`)
            .send(putData)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                expect(Object.keys(result.body).length).equal(1);
                const res = result.body.result;
                expect(res.createdAt).to.equal(initData.createdAt);
                expect(res.id).to.equal(initData.id);
                expect(res.user).to.equal(initData.user);
                expect(res.status).to.equal(initData.status);
                expect(res.details).to.equal(initData.details);
                expect(res.title).to.equal(putData.title);
                return done();
            });
    });

    it('update status', (done) => {
        const initData = {
            createdAt: 1624880776084,
            id: '6393a789-1000-4a97-9fc1-57a528e9d460',
            user: 'put user',
            title: 'todo',
            details: 'todo detail',
        };
        const putData = {
            status: 'After update',
        };
        server
            .put(`todo/${initData.user}/${initData.id}`)
            .send(putData)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                expect(Object.keys(result.body).length).equal(1);
                const res = result.body.result;
                expect(res.createdAt).to.equal(initData.createdAt);
                expect(res.id).to.equal(initData.id);
                expect(res.user).to.equal(initData.user);
                expect(res.title).to.equal(initData.title);
                expect(res.details).to.equal(initData.details);
                expect(res.status).to.equal(putData.status);
                return done();
            });
    });

    it('update details', (done) => {
        const initData = {
            createdAt: 1624880710910,
            id: '3eb4639b-0e51-483a-9048-908c6f708666',
            user: 'put user',
            title: 'todo',
            status: 'Waiting',
        };
        const putData = {
            details: 'After update',
        };
        server
            .put(`todo/${initData.user}/${initData.id}`)
            .send(putData)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                expect(Object.keys(result.body).length).equal(1);
                const res = result.body.result;
                expect(res.createdAt).to.equal(initData.createdAt);
                expect(res.id).to.equal(initData.id);
                expect(res.user).to.equal(initData.user);
                expect(res.title).to.equal(initData.title);
                expect(res.status).to.equal(initData.status);
                expect(res.details).to.equal(putData.details);
                return done();
            });
    });

    it('update all', (done) => {
        const initData = {
            createdAt: 1625065494017,
            id: '99304554-af08-48f3-acc7-6452164207ad',
            user: 'put user',
        };
        const putData = {
            title: 'After update',
            status: 'After update',
            details: 'After update',
        };
        server
            .put(`todo/${initData.user}/${initData.id}`)
            .send(putData)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                expect(Object.keys(result.body).length).equal(1);
                const res = result.body.result;
                expect(res.createdAt).to.equal(initData.createdAt);
                expect(res.id).to.equal(initData.id);
                expect(res.user).to.equal(initData.user);
                expect(res.title).to.equal(putData.title);
                expect(res.status).to.equal(putData.status);
                expect(res.details).to.equal(putData.details);
                return done();
            });
    });

    it('update with invalid user', (done) => {
        const id = '19af5cfa-76f2-467b-8b0f-778e9a279';
        const putData = {
            title: 'After update',
        };
        server.put(`todo/dummyUser/${id}`).send(putData).expect(404).end(done);
    });

    it('update with invalid id', (done) => {
        const user = 'get user';
        const putData = {
            title: 'After update',
        };
        server.put(`todo/${user}/dummyId`).send(putData).expect(404).end(done);
    });

    it('update no param', (done) => {
        const user = 'get user';
        server.put(`todo/${user}/dummyId`).expect(400).end(done);
    });
});
