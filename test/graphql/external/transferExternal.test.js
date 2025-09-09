// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

// Testes
describe('Testes de Transferencia', () => {
    
    beforeEach(async () => {
        const loginUser = require('../fixture/requisicoes/login/loginUser.json');
        const resposta = await request('http://localhost:4000/graphql')
        .post('')
        .send({
            query: `
                mutation LoginUser($username: String!, $password: String!) {
                    loginUser(username: $username, password: $password) {
                        token
                    }
                }`,
            variables: {
                username: "julio",
                password: "123456"
            }
        }); 
        token = resposta.body.data.loginUser.token;
    });

    it('Validar que é possivel tranferir grana entre duas contas', async() =>{
        const respostaTransferencia = await request('http://localhost:4000/graphql')
            .post('')
            .set('Authorization', `Bearer ${token}`)   
            .send({
                query: `
                    mutation CreateTransfer($from: String!, $to: String!, $value: Float!) {
                        createTransfer(from: $from, to: $to, value: $value) {  
                            date
                            from
                            to              
                            value 
                        }
                    }
                `,
                variables: {
                    from: "julio",
                    to: "priscila",
                    value: 15
                }
            }); 
        expect(respostaTransferencia.status).to.equal(200);   

    });

    it.only('Validar que não é possivel tranferir com saldo insuficiente', async() =>{
        const respostaTransferencia = await request('http://localhost:4000/graphql')
            .post('')
            .set('Authorization', `Bearer ${token}`)   
            .send({
                query: `
                    mutation CreateTransfer($from: String!, $to: String!, $value: Float!) {
                        createTransfer(from: $from, to: $to, value: $value) {  
                            date
                            from
                            to              
                            value 
                        }
                    }
                `,
                variables: {
                    from: "julio",
                    to: "priscila",
                    value: 10000.01
                }
            }); 
        expect(respostaTransferencia.status).to.equal(200);   

    });


});
  