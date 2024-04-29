Feature: End to end Ecommerce validation

    application Regression
    
    Scenario: Login with correct username but incorrect password
    Given I open saucedemo ECommerce Page
    Then Use all accepted usernames and incorrect password combination to verify the error message 

    @Regression 
    Scenario: Verify cart item details 
    Given I open saucedemo ECommerce Page
    And I login with correct username and password
    When I filter the products from low to high price
    And add first and last item to the cart
    Then verify the product description along with price from the cart page

    @Regression
    Scenario: Successfully checkout 
    Given I open saucedemo ECommerce Page
    And  I login with correct username and password
    When I add any one item to the cart 
    And I perform checkout from the cart page 
    Then fill all required information
    And complete the checkout
    Then verify checkout is complete along with correct order dispatched message


