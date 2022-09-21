describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicacao', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')


    })

    it('preenche os campos obrigatórios e envia o fórmulario', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moreira')
        cy.get('#email').type('renanmoreira.po@gmail.com')
        cy.get('#phone').type('85992169174')
        cy.get('#open-text-area').type(longText, { delay: 0}) // Delay 0 para nao ter delay na escrita
        cy.get('button[type="submit"]').click()
        cy.wait(1000)
        cy.get('.success').should('be.visible') // o ponto antes do success é para identificar que é uma classe
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatacao', function() {
        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moreira')
        cy.get('#email').type('renanmoreira.po@gmail,com') // Um email que nao e valido
        cy.get('#phone').type('85992169174')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.wait(1000)
        cy.get('.error').should('be.visible') // classe de error
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numerico', function() {

        cy.get('#phone')
            .type('avfdfdf')
                .should('have.value', '') // procurar um valor vazio pois foi digitado no lugar de numeros, letras!

    })

    it('mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moreira')
        cy.get('#email').type('renanmoreira.po@gmail.com')
        cy.get('#phone-checkbox').click()
        // cy.get('#phone').type('85992169174') // Vai aparecer mensagem de error pois marquei a caixa do telefone mas nao escrevi o telefone
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.wait(1000)
        cy.get('.error').should('be.visible') // classe de error

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('#firstName')
            .type('Renan')
            .should('have.value', 'Renan')
            .clear()
            .should('have.value', '')
         
            cy.get('#lastName')
            .type('Moreira')
            .should('have.value', 'Moreira')
            .clear()
            .should('have.value', '')

            cy.get('#email')
            .type('renanmoreira.po@gmail.com')
            .should('have.value', 'renanmoreira.po@gmail.com')
            .clear()
            .should('have.value', '')

            cy.get('#phone')
            .type('85992169174')
            .should('have.value', '85992169174')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.get('#phone').type('85992169174')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.renan()
    })
})