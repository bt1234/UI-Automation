class ConfirmationPage{

    getConfirmationTitleElement(){
        return cy.get('[data-test="title"]')
    }

    getConfirmationTextElement(){
        return cy.get('[data-test="complete-text"]')
    }

}

export default ConfirmationPage