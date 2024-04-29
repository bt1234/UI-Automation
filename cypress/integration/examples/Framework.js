/// <reference types = "Cypress" />

//import LoginPage from '/Users/bhavi/CypressAutomation/cypress/integration/examples/LoginPage.js'

import LoginPage from "../PageObjects/LoginPage"
import ProductsPage from "../PageObjects/ProductsPage"
import CartPage from "../PageObjects/CartPage"
import CheckoutPage from "../PageObjects/CheckoutPage"
import CheckoutPage2 from "../PageObjects/CheckoutPage2"
import ConfirmationPage from "../PageObjects/ConfirmationPage"

//https://github.com/cypress-io/cypress/issues/27501 open issue 
//websit is failing to fire load event, need to add chromeWebSecurity: false in cypress.congif.js

describe('Suite', function () {
  let productsPage = new ProductsPage()
  let loginPage = new LoginPage()
  let cartPage = new CartPage()
  let checkoutPage = new CheckoutPage()
  let checkoutPage2 = new CheckoutPage2()
  let confirmationPage = new ConfirmationPage()
  let data
 
  beforeEach(function () {
    // runs once before all tests in the block
    cy.fixture('example').then(function (fdata) {
      this.data = fdata
    })

  
  })
  

  it('first question', function () {
    
    //check the error message when wrong password is given
    cy.visit(Cypress.env('url'));

    this.data.usernamepasswordarray.forEach(function (element) {
      loginPage.getUsernameElement().type(element.user)
      loginPage.getPasswordElement().type(element.password)
      loginPage.getLoginButton().click()
      loginPage.getErrorElement().should('contain', 'Epic sadface: Username and password do not match any user in this service')
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

  it('second question', function () {
    //tag:regression
    //To add first and last element after filter lo to hi
    cy.visit(Cypress.env('url'))

    // loginPage.getUsernameElement().type(this.data.username)
    // loginPage.getUsernameElement().type(Cypress.env('username'))
    // loginPage.getPasswordElement().type(this.data.correctpassword)
    // loginPage.getLoginButton().click()

    //Using custom function login from command.js in place of above 4 lines
    cy.login()

    //clicking the filter dropdown and selecting low to high

    productsPage.getFilterDropdown('lohi')


    productsPage.getInventoryList().find(productsPage.getInventoryItems()).each(($e1, index, $list) => {

      if (index == 0) {
        $e1.find('button').click() //returns just one button
      }
      if (index == $list.length - 1) {
        $e1.find('button').click()
      }
    })

    //Go to shopping cart
    productsPage.getShoppinCart().click()
    cy.url().should('include', 'cart.html')
    productsPage.getCartItems().should('have.length', 2)


    // Verify product text and price
    //    cy.get('.inventory_item_desc').eq(0).should('contain', this.data.firstproducttext)
    //    cy.get('.inventory_item_desc').eq(1).should('contain', this.data.lastproducttext)

    productsPage.getCartItems().each(function (el, index, list) {
      if (index == 0) {
        const textOfElement = el.text()
        expect(textOfElement).to.equal(this.data.firstproducttext)

        productsPage.getPriceOfCartItems().eq(index).should('contain', this.data.firstproductprice)


      }
      else if (index == list.length - 1) {

        const textOfElement = el.text()
        expect(textOfElement).to.equal(this.data.lastproducttext)

        productsPage.getPriceOfCartItems().eq(index).should('contain', this.data.lastproductprice)

      }
    })

  })

  it('third question', function () {
    //using environment variable defined in the cypress.config.js
    cy.visit(Cypress.env('url'))

    // loginPage.getUsernameElement().type(Cypress.env('username'))
    // loginPage.getPasswordElement().type(this.data.correctpassword)
    // loginPage.getLoginButton().click()

    //using the custom function login here in place of the above 4 lines
    cy.login()
    
    //Adding any element to cart
    productsPage.addToCart().eq(0).click()

    //Go to shopping cart
    productsPage.getShoppinCart().click()
    cy.url().should('include', 'cart.html')

    cartPage.getCheckoutElement().click()

    checkoutPage.getFirstNameElement().type(this.data.name)
    checkoutPage.getLastNameElement().type(this.data.lastname)
    checkoutPage.getPostalCodeElement().type(this.data.postalcode)

    checkoutPage.getContinueElement().click()

    cy.url().should('include', 'checkout-step-two')
    checkoutPage2.getFinishElement().click()

    cy.url().should('include', 'checkout-complete')
    confirmationPage.getConfirmationTitleElement().then(function (confirmationElement) {
      const confirmationText = confirmationElement.text()
      expect(confirmationText).to.equal(this.data.confirmationtitletext)
      //expect(confirmationText.includes('Checkout: Complete!')).to.be.true
      cy.log(confirmationText)

    })
    confirmationPage.getConfirmationTextElement().should('contain', this.data.confirmationtext)

  })
})