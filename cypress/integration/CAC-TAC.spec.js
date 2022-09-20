describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })
    it('verifica o título da aplicacao', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');


    })

    it('preenche os campos obrigatórios e envia o fórmulario', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Renan');
        cy.get('#lastName').type('Moreira');
        cy.get('#email').type('renanmoreira.po@gmail.com');
        cy.get('#phone').type('85992169174');
        cy.get('#open-text-area').type(longText, { delay: 0}); // Delay 0 para nao ter delay na escrita
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        cy.get('.success').should('be.visible'); // o ponto antes do success é para identificar que é uma classe
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatacao', function() {
        cy.get('#firstName').type('Renan');
        cy.get('#lastName').type('Moreira');
        cy.get('#email').type('renanmoreira.po@gmail,com'); // Um email que nao e valido
        cy.get('#phone').type('85992169174');
        cy.get('#open-text-area').type('Teste');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        cy.get('.error').should('be.visible'); // classe de error
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numerico', function() {

        cy.get('#phone')
            .type('avfdfdf')
                .should('have.value', '') // procurar um valor vazio pois foi digitado no lugar de numeros, letras!

    })
})