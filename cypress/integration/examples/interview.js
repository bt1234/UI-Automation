/// <reference types = "Cypress" />

//import LoginPage from '/Users/bhavi/CypressAutomation/cypress/integration/examples/LoginPage.js'

import LoginPage from "../PageObjects/LoginPage"

describe('Suite',function(){

    let data
    before(function () {
        // runs once before all tests in the block
        cy.fixture('example').then(function (fdata) {
          this.data = fdata
        })
      })

it('first question', function(){
    const loginPage = new LoginPage()

    cy.visit(Cypress.env('url'));
   
    this.data.usernamepasswordarray.forEach(function (element){
        loginPage.getUsernameElement().type(element.user)
        loginPage.getPasswordElement().type(element.password)
        loginPage.getLoginButton().click()
        loginPage.getErrorElement().should('contain','Epic sadface: Username and password do not match any user in this service')
        loginPage.getErrorButton().click()
        loginPage.getUsernameElement().clear()
        loginPage.getPasswordElement().clear()
    })
/**for login with one username and password */
//    cy.get('#user-name').type(this.data.username)
//     cy.get('#password').type(this.data.incorrectpassword)
//     cy.get('#login-button').click()
   
  
   // cy.get('.error h3').should('contain','Epic sadface: Username and password do not match any user in this service')

   
    
})

})