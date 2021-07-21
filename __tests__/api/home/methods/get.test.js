const server = require('../../../../src/index');
const request = require('supertest')(server.listener);

afterAll(() => {
    server.stop()
})

describe('Test route Home', () => {
    test('return 200 when GET /', done => {
        request.get(`/`).expect(200).end((err, response) => {
            expect(response.status).toEqual(302);
            done();
        });
    });
});