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
    //added retry mechanism as entering username is flacky sometimes
    cy.get(this.username)
      .should('be.visible')
      .click()
      .clear()
      .type(username)

    // verify and fix if needed
    cy.get(this.username).invoke('val').then((val) => {

        if (val !== username) {
          cy.log('Retry typing username')

          cy.get(this.username)
            .clear()
            .type(username)
            .should('have.value', username)
        }
      })
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