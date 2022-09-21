Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Moreira')
    cy.get('#email').type('renanmoreira.po@gmail.com')
    cy.get('#phone').type('85992169174')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible') // o ponto antes do success é para identificar que é uma classe   
})