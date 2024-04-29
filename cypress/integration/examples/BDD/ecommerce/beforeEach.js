
 beforeEach(function () {
    // runs once before all tests in the block
    cy.fixture('example').then(function (fdata) {
      this.data = fdata
    })

  
  })