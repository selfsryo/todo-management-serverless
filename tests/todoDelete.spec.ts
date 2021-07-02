import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const server = request('http://localhost:3000/local/');

describe('API — todoDelete', () => {
    const user = 'postUser';

    it('delete a specific todo', (done) => {
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
                expect(res.user).to.equal(user);
                expect(res.title).to.equal(postData.title);
                expect(res.status).to.equal(postData.status);
                expect(res).to.not.have.property('details');

                server
                    .del(`todo/${user}/${res.id}`)
                    .expect(200)
                    .end((error2, result2) => {
                        if (error2) throw error2;
                        server
                            .get(`todo/${user}/${result2.body.id}`)
                            .expect(404)
                            .end(done);
                    });
            });
    });

    it('delete with invalid user', (done) => {
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
                expect(res.user).to.equal(user);
                expect(res.title).to.equal(postData.title);
                expect(res.status).to.equal(postData.status);
                expect(res).to.not.have.property('details');

                server.del(`todo/dummyUser/${res.id}`).expect(404).end(done);
            });
    });

    it('delete with invalid id', (done) => {
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
                expect(res.user).to.equal(user);
                expect(res.title).to.equal(postData.title);
                expect(res.status).to.equal(postData.status);
                expect(res).to.not.have.property('details');

                server.del(`todo/${user}/dummyId`).expect(404).end(done);
            });
    });
});
