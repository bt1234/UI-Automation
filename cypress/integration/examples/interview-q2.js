/// <reference types = "Cypress" />

import LoginPage from "../PageObjects/LoginPage"
import ProductsPage from "../PageObjects/ProductsPage"
describe('Suite', function (){
    const loginPage = new LoginPage()
    const productsPage = new ProductsPage()
    let data
    before(function () {
        // runs once before all tests in the block
        cy.fixture('example').then(function (fdata) {
          this.data = fdata
        })
      })

    it('second question', function() {
        //To add first and last element
        cy.visit(Cypress.env('url'))

       // loginPage.getUsernameElement().type(this.data.username)
        loginPage.getUsernameElement().type(Cypress.env('username'))
        loginPage.getPasswordElement().type(this.data.correctpassword)
        loginPage.getLoginButton().click()

        //clicking the filter dropdown and selecting low to high

        productsPage.getFilterDropdown('lohi')
        
        //Adding first and last product to the cart
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
        cy.url().should('include','cart.html')
        productsPage.getCartItems().should('have.length',2)


        // Verify product text and price
    //    cy.get('.inventory_item_desc').eq(0).should('contain', this.data.firstproducttext)
    //    cy.get('.inventory_item_desc').eq(1).should('contain', this.data.lastproducttext)
        
        productsPage.getCartItems().each(function(el,index,list){
            if(index == 0){
                const textOfElement = el.text()
                expect(textOfElement).to.equal(this.data.firstproducttext)
                
                productsPage.getPriceOfCartItems().eq(index).should('contain',this.data.firstproductprice)
                

            }
            else if (index == list.length - 1){
    
                const textOfElement = el.text()
                expect(textOfElement).to.equal(this.data.lastproducttext)
                
                productsPage.getPriceOfCartItems().eq(index).should('contain',this.data.lastproductprice)
                
            }
       })

    })


})