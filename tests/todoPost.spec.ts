import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const server = request('http://localhost:3000/local/');

describe('API — todoPost', () => {
    const user = 'postUser';

    it('post a todo', (done) => {
        const postData = {
            title: 'post',
            status: 'New',
        };
        server
            .post(`todo/${user}`)
            .send(postData)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                expect(Object.keys(result.body).length).equal(1);
                const res = result.body.result;
                expect(res.title).to.equal(postData.title);
                expect(res.user).to.equal(user);
                expect(res.status).to.equal(postData.status);
                expect(res).to.not.have.property('details');
                return done();
            });
    });

    it('post a todo with details', (done) => {
        const postData = {
            title: 'post',
            status: 'New',
            details: 'todo detail',
        };
        server
            .post(`todo/${user}`)
            .send(postData)
            .expect(200)
            .end((error, result) => {
                if (error) throw done(error);
                expect(Object.keys(result.body).length).equal(1);
                const res = result.body.result;
                expect(res.title).to.equal(postData.title);
                expect(res.user).to.equal(user);
                expect(res.status).to.equal(postData.status);
                expect(res.details).to.equal(postData.details);
                return done();
            });
    });

    it('post with incomplete param (title)', (done) => {
        const postData = {
            status: 'New',
            details: 'todo detail',
        };
        server.post(`todo/${user}`).send(postData).expect(400).end(done);
    });

    it('post with incomplete param (status)', (done) => {
        const postData = {
            title: 'post',
            details: 'todo detail',
        };
        server.post(`todo/${user}`).send(postData).expect(400).end(done);
    });

    it('post with invalid param', (done) => {
        const postData = {
            dummyTitle: 'post',
            dummyStatus: 'New',
            dummyDetails: 'todo detail',
        };
        server.post(`todo/${user}`).send(postData).expect(400).end(done);
    });

    it('post with no param', (done) => {
        server.post(`todo/${user}`).expect(400).end(done);
    });
});
