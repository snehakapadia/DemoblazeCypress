class ProductPage {

  constructor() {
    this.productName = '.name'
    this.productPrice = '.price-container'
    this.productInfo = '#more-information'
    this.addToCartBtn = 'Add to cart'
  }

  verifyProductPageUrl() {
    cy.url().should('include', 'prod.html?idp_=')
  }

  verifyProductPage() {
    cy.get(this.productName)
      .should('be.visible')
      .and('not.be.empty')

    cy.get(this.productPrice)
      .should('contain.text', '$')

    cy.get(this.productInfo)
      .should('be.visible')
  }

  addToCart() {
    cy.contains(this.addToCartBtn)
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }

  handleAlert() {
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Product added.')
    })
  }

  addProductToCart() {
    this.verifyProductPage()
    this.addToCart()
  }

}

export default new ProductPage()