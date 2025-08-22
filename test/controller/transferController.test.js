//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');

//aplicação
const app = require('../../app');
const { expect } = require('chai');
describe('transferController', () => {
    describe('POST /transfer',() => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            //Mocar apenas a função transfer do service
            const transferService = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

            const resposta = await request (app)
                .post('/transfers')
                .send({
                    from: "Julio",
                    to: "priscila",
                    value: 100
                })

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')

            //reseta o mock
            sinon.restore();

        });
    });

});



