import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../../PageObjects/LoginPage"
import ProductsPage from "../../../PageObjects/ProductsPage"
import CartPage from "../../../PageObjects/CartPage"
import CheckoutPage from "../../../PageObjects/CheckoutPage"
import CheckoutPage2 from "../../../PageObjects/CheckoutPage2"
import ConfirmationPage from "../../../PageObjects/ConfirmationPage"

let productsPage = new ProductsPage()
let loginPage = new LoginPage()
let cartPage = new CartPage()
let checkoutPage = new CheckoutPage()
let checkoutPage2 = new CheckoutPage2()
let confirmationPage = new ConfirmationPage()



Given ('I open saucedemo ECommerce Page', function(){
    cy.visit(Cypress.env('url'))
})
Then ('Use all accepted usernames and incorrect password combination to verify the error message', function(){
    this.data.usernamepasswordarray.forEach(function (element) {
        loginPage.getUsernameElement().type(element.user)
        loginPage.getPasswordElement().type(element.password)
        loginPage.getLoginButton().click()
        loginPage.getErrorElement().should('contain', 'Epic sadface: Username and password do not match any user in this service')
        loginPage.getErrorButton().click()
        loginPage.getUsernameElement().clear()
        loginPage.getPasswordElement().clear()
      })
})

When ('I login with correct username and password',function(){
    cy.login() //custom method login
})
Then ('I filter the products from low to high price',function(){
    productsPage.getFilterDropdown('lohi')
})
Then ('add first and last item to the cart', function(){
    productsPage.getInventoryList().find(productsPage.getInventoryItems()).each(($e1, index, $list) => {
        if (index == 0) {
          $e1.find('button').click() //returns just one button
        }
        if (index == $list.length - 1) {
          $e1.find('button').click()
        }
      })
    productsPage.getShoppinCart().click()
    cy.url().should('include', 'cart.html')
    productsPage.getCartItems().should('have.length', 2)

})
Then ('verify the product description along with price from the cart page', function(){
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

Then('I add any one item to the cart', function(){
    productsPage.addToCart().eq(0).click()
})

When('I perform checkout from the cart page',function (){
    productsPage.getShoppinCart().click()
    cy.url().should('include', 'cart.html')
    cartPage.getCheckoutElement().click()
})

Then ('fill all required information', function(){
    checkoutPage.getFirstNameElement().type(this.data.name)
    checkoutPage.getLastNameElement().type(this.data.lastname)
    checkoutPage.getPostalCodeElement().type(this.data.postalcode)
})
Then ('complete the checkout', function(){
    checkoutPage.getContinueElement().click()
    cy.url().should('include', 'checkout-step-two')
    checkoutPage2.getFinishElement().click()
})
Then ('verify checkout is complete along with correct order dispatched message',function (){
    cy.url().should('include', 'checkout-complete')
    confirmationPage.getConfirmationTitleElement().then(function (confirmation) {
      const confirmationText = confirmation.text()
      expect(confirmationText).to.equal(this.data.confirmationtitletext)
      //expect(confirmationText.includes('Checkout: Complete!')).to.be.true
      cy.log(confirmationText)

    })
    confirmationPage.getConfirmationTextElement().should('contain', this.data.confirmationtext)
})