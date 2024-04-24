// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import LoginPage from "../integration/PageObjects/LoginPage"
let loginPage = new LoginPage()
// -- This is a parent command --
Cypress.Commands.add('login', function () 
{ 
    loginPage.getUsernameElement().type(Cypress.env('username'))
    loginPage.getPasswordElement().type(this.data.correctpassword)
    loginPage.getLoginButton().click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })