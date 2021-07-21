const server = require('../../../../src/index');
const request = require('supertest')(server.listener);
const config = require('../../../../config/default');

afterAll(() => {
    server.stop()
})

describe('Test route Health', () => {
    test('return 200 when GET /health/ping', done => {
        request.get(`${config.routesPath}/health/ping`).expect(200).end((err, response) => {
            expect(response.body.status).toMatch( 'pong');
            done();
        });
    });

    test('return 200 when GET /health', done => {
        request.get(`${config.routesPath}/health`).expect(200).end((err, response) => {
            expect(response.body.status).toMatch( 'health');
            done();
        });
    });
});