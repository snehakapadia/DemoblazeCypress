class HomePage {

  constructor() {
    this.cartButton = '#cartur'
    this.homeButton = 'Home'
    this.productList = '.card-title a'
    this.cartButton = '#cartur'
  }

  openCart() {
    cy.get(this.cartButton)
      .should('be.visible')
      .click()
  }

  gotoHome() {
    cy.contains(this.homeButton)
      .should('be.visible')
      .click()
  }

  selectProduct(productName) {
    cy.contains(productName)
      .should('be.visible')
      .click()
  }

  openCart() {
    cy.get(this.cartButton)
      .should('be.visible')
      .click()
  }

}

export default new HomePage()