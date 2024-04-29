class LoginPage{

    getUsernameElement(){
       return cy.get('#user-name')
    }

    getPasswordElement(){
        return cy.get('#password')
    }

    getLoginButton(){
        return cy.get('#login-button')
    }

    getErrorElement(){
        return  cy.get('[data-test = "error"]')
    }

    getErrorButton(){
        return cy.get('[data-test="error-button"]')
    }

}

export default LoginPage