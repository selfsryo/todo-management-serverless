import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const server = request('http://localhost:3000/local/');

describe('API — todoPut', () => {
    it('update title', (done) => {
        const initData = {
            createdAt: 1625065388887,
            id: '8c4d0454-6350-4846-99e6-653d244801ae',
            user: 'putUser',
            title: 'to put',
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
                expect(res).to.have.property('updatedAt');
                return done();
            });
    });

    it('update status', (done) => {
        const initData = {
            createdAt: 1624880776084,
            id: '6393a789-1000-4a97-9fc1-57a528e9d460',
            user: 'putUser',
            title: 'todo',
            status: 'to put',
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
                expect(res).to.have.property('updatedAt');
                return done();
            });
    });

    it('update details', (done) => {
        const initData = {
            createdAt: 1624880710910,
            id: '3eb4639b-0e51-483a-9048-908c6f708666',
            user: 'putUser',
            title: 'todo',
            status: 'Waiting',
            details: 'to put',
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
                expect(res).to.have.property('updatedAt');
                return done();
            });
    });

    it('update all', (done) => {
        const initData = {
            createdAt: 1625065494017,
            id: '99304554-af08-48f3-acc7-6452164207ad',
            user: 'putUser',
            title: 'to put',
            status: 'to put',
            details: 'to put',
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
                expect(res).to.have.property('updatedAt');
                return done();
            });
    });

    it('update to add details', (done) => {
        const initData = {
            createdAt: 1625215982124,
            id: 'e89130b8-587a-443b-929a-d26ba917ae4c',
            user: 'putUser',
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
                expect(res).to.have.property('updatedAt');
                return done();
            });
    });

    it('update with invalid user', (done) => {
        const id = '19af5cfa-76f2-467b-8b0f-778cb5e9a279';
        const putData = {
            title: 'After update',
        };
        server.put(`todo/dummyUser/${id}`).send(putData).expect(404).end(done);
    });

    it('update with invalid id', (done) => {
        const user = 'getUser';
        const putData = {
            title: 'After update',
        };
        server.put(`todo/${user}/dummyId`).send(putData).expect(404).end(done);
    });

    it('update with no param', (done) => {
        const id = '19af5cfa-76f2-467b-8b0f-778cb5e9a279';
        const user = 'getUser';
        server.put(`todo/${user}/${id}`).expect(400).end(done);
    });
});
