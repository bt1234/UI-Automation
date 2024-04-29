/// <reference types = "Cypress" />
import LoginPage from "../PageObjects/LoginPage"
import ProductsPage from "../PageObjects/ProductsPage"
describe('Suite', function () {
  const loginPage = new LoginPage()
  const productsPage = new ProductsPage()
  let data
  before(function () {
    // runs once before all tests in the block
    cy.fixture('example').then(function (fdata) {
      this.data = fdata
    })
  })

  it('third question', function () {
    cy.visit(Cypress.env('url'))
    // cy.visit('https://www.google.com/');

    //loginPage.getUsernameElement().type(this.data.username)
    loginPage.getUsernameElement().type(Cypress.env('username'))
    loginPage.getPasswordElement().type(this.data.correctpassword)
    loginPage.getLoginButton().click()

    //Adding any element to cart
    //cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.contains('Add to cart').eq(0).click()

    //Go to shopping cart
    productsPage.getShoppinCart().click()
    cy.url().should('include', 'cart.html')

    cy.contains('Checkout').click()

    cy.get('#first-name').type(this.data.name)
    cy.get('#last-name').type(this.data.lastname)
    cy.get('#postal-code').type(this.data.postalcode)

    cy.get('[value = "Continue"]').click()

    cy.url().should('include', 'checkout-step-two')
    cy.get('#finish').click()

    cy.url().should('include', 'checkout-complete')
    cy.get('[data-test="title"]').then(function (confirmation) {
      const confirmationText = confirmation.text()
      expect(confirmationText).to.equal('Checkout: Complete!')
      //expect(confirmationText.includes('Checkout: Complete!')).to.be.true
      cy.log(confirmationText)

    })

    cy.get('[data-test="complete-text"]').should('contain', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')

  })

})