const cep = require("../../../../src/utils/cep/cep");
const jwt = require('jsonwebtoken');

process.env.AUTHORIZATION='true'

const server = require('../../../../src/index');
const request = require('supertest')(server.listener);
const config = require('../../../../config/default');

beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

afterAll(() => {
    server.stop();
});

describe('Test route Cep with auth', () => {
    let token;
    beforeAll(() => {
        token = jwt.sign({userName: 'lucas.volgarini', app: 'cep-finder-test'}, config.auth.secret);
    });

    test('return 200 when GET /find with token', async () => {
        const spyCep = jest.spyOn(cep, 'findCep');
        spyCep.mockResolvedValue({
            "cep": "14022320",
            "state": "SP",
            "city": "Ribeirão Preto",
            "neighborhood": "Reserva Sul Condomínio Resort",
            "street": "Via João Batista Santanna",
            "service": "brasilapi"
        });

        const response = await request.get(`${config.routesPath}/find`).query({cep: '14022320'}).set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.cep).toMatch('14022320');
    });

    test('return 401 when GET /find with blank token', async () => {
        const response = await request.get(`${config.routesPath}/find`).query({cep: '14022320'}).set('Authorization', '');
        expect(response.status).toBe(401);
        expect(response.body.error).toMatch('Unauthorized');
    });

    test('return 401 when GET /find with invalid token', async () => {
        const response = await request.get(`${config.routesPath}/find`).query({cep: '14022320'}).set('Authorization', 'blablabla');
        expect(response.status).toBe(401);
        expect(response.body.error).toMatch('Unauthorized');
    });
});