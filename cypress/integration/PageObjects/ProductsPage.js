class ProductsPage {

    getShoppinCart(){
        return cy.get('.shopping_cart_link')
    }

    getFilterDropdown(value){
        return cy.get('select').select(value)
    }

    getInventoryList(){
        return cy.get('.inventory_list')
    }

    getInventoryItems(){
        return '.inventory_item'
    }

    getCartItems(){
        return cy.get('.inventory_item_desc')
    }

    getPriceOfCartItems(){
        return cy.get('.inventory_item_price')
    }

    addToCart(){
        return cy.contains('Add to cart')
    }


}

export default ProductsPage