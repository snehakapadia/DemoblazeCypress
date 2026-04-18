class LoginPage {

  constructor() {
    this.loginButton = '#login2'
    this.username = '#loginusername'
    this.password = '#loginpassword'
    this.submitButton = 'button[onclick="logIn()"]'
    this.logoutButton = '#logout2' 
  }

  openLogin() {
    cy.get(this.loginButton)
      .should('be.visible')
      .click()
  }

  enterUsername(username) {
    cy.get(this.username)
      .should('be.visible')
      .clear()
      .type(username, { delay: 100 } )
  }

  enterPassword(password) {
    cy.get(this.password)
      .should('be.visible')
      .clear()
      .type(password)
  }

  submitLogin() {
    cy.get(this.submitButton)
      .should('be.visible')
      .click()
  }

  login(username, password) {
    this.openLogin()
    this.enterUsername(username)
    this.enterPassword(password)
    this.submitLogin()
  }

  verifyLoginSuccess() {
    cy.contains('Welcome').should('be.visible')
    cy.get(this.logoutButton).should('be.visible')
  }
}

export default new LoginPage()