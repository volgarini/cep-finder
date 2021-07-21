const cep = require("../../../../src/utils/cep/cep");
const server = require('../../../../src/index');
const request = require('supertest')(server.listener);
const config = require('../../../../config/default');

beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

afterAll(() => {
    server.stop();
})

describe('Test route Cep', () => {
    test('return 200 when GET /find', async () => {
        const spyCep = jest.spyOn(cep, 'findCep');
        spyCep.mockResolvedValue({
            "cep": "14022320",
            "state": "SP",
            "city": "Ribeirão Preto",
            "neighborhood": "Reserva Sul Condomínio Resort",
            "street": "Via João Batista Santanna",
            "service": "brasilapi"
        });

        const response = await request.get(`${config.routesPath}/find`).query({cep: '14022320'});
        expect(response.status).toBe(200);
        expect(response.body.cep).toMatch('14022320');
    });

    test('return 200 when GET /find a near cep', async () => {
        const spyCep = jest.spyOn(cep, 'findCep');
        spyCep.mockRejectedValueOnce({
            "type": "service_error",
        });

        spyCep.mockRejectedValueOnce({
            "type": "service_error",
        });

        spyCep.mockRejectedValueOnce({
            "type": "service_error",
        });

        spyCep.mockResolvedValue({
            "cep": "14050000",
            "state": "SP",
            "city": "Ribeirão Preto",
            "neighborhood": "Vila Tibério",
            "street": "Avenida Fábio Barreto",
            "service": "brasilapi"
        });

        const response = await request.get(`${config.routesPath}/find`).query({cep: '14050999'});
        expect(response.status).toBe(200);
        expect(response.body.cep).toMatch('14050000');
    });

    test('return 404 when GET /find not found a cep', async () => {
        const response = await request.get(`${config.routesPath}/find`).query({cep: 'AAAAAAAA'});
        expect(response.status).toBe(404);
    });

    test('return 500 when GET /find internal error', async () => {
        const spyCep = jest.spyOn(cep, 'findCep');
        spyCep.mockRejectedValue({
            "status": 500,
        });

        const response = await request.get(`${config.routesPath}/find`).query({cep: 'AAAAA---'});
        expect(response.status).toBe(500);
    });

    test('return 406 when GET /find validation error', async () => {
        const spyCep = jest.spyOn(cep, 'findCep');
        spyCep.mockRejectedValue({
            "type": "validation_error",
        });

        const response = await request.get(`${config.routesPath}/find`).query({cep: 'AAAAA---'});
        expect(response.status).toBe(406);
    });
});