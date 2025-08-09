//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');

//aplicação
const app = require('../../app');
const { expect } = require('chai');
describe('transferController', () => {
    describe('POST /transfer',() => {
        it('Quando uso dados válidos o retorno será 201', async () => {
            const resposta = await request (app)
                .post('/transfers')
                .send({
                    from: "Julio",
                    to: "priscila",
                    value: 100
                })
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')

        });
    });
    describe('GET /transfers',() => {
        //its ficam aqui
    });   

});



