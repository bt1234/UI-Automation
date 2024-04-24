class CheckoutPage{

    getFirstNameElement(){
        return cy.get('#first-name')
    }

    getLastNameElement(){
        return cy.get('#last-name')
    }

    getPostalCodeElement(){
        return cy.get('#postal-code')
    }

    getContinueElement(){
        return cy.get('[value = "Continue"]')
    }

}

export default CheckoutPage