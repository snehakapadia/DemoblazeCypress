class CartPage {

  constructor() {
    this.deleteButton = 'Delete'
    this.placeOrderBtn = 'Place Order'
    this.purchaseBtn = 'Purchase'
    this.name = '#name'
    this.country = '#country'
    this.city = '#city'
    this.card = '#card'
    this.month = '#month'
    this.year = '#year'
    this.successPopup = '.sweet-alert'
    this.successIcon = '.sa-success'
    this.okButton = 'OK'
  }

  verifyProduct(productName) {
    cy.contains(productName)
      .should('be.visible')
  }

  deleteProduct(productName) {
    cy.contains(this.deleteButton)
      .should('be.visible')
      .click()
  }

  verifyProductRemoved(productName) {
    cy.contains(productName)
      .should('not.exist')
  }

  placeOrder() {
    cy.contains(this.placeOrderBtn)
      .should('be.visible')
      .click()
  }

  fillOrderForm(name, country, city, card, month, year) {
    cy.get(this.name).type(name)
    cy.get(this.country).type(country)
    cy.get(this.city).type(city)
    cy.get(this.card).type(card)
    cy.get(this.month).type(month)
    cy.get(this.year).type(year)
  }

  purchase() {
    cy.contains(this.purchaseBtn)
      .should('be.visible')
      .click()
  }

  verifySuccessPopup(name) {
    cy.get(this.successPopup)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
      expect(text).to.include('Thank you for your purchase')
      expect(text).to.match(/Id:\s*\d+/)
      expect(text).to.include('Amount')
      expect(text).to.include('Card Number')
      expect(text).to.include(name)
      expect(text).to.include('Date')
    })
  cy.get(this.successIcon).should('be.visible')
  }

  closePopup() {
    cy.contains(this.okButton)
      .should('be.visible')
      .click()
  }

}

export default new CartPage()