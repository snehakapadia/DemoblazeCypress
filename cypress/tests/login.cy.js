import LoginPage from '../pages/LoginPage'

describe('Login Tests', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should login successfully with valid credentials', () => {
    cy.fixture('users').then((user) => {
      LoginPage.login(user.validUser.username, user.validUser.password)
    })
    LoginPage.verifyLoginSuccess()
  })

  it('should show error for invalid login credentials', () => {
    LoginPage.login('wrongUser', 'wrongPass')
    cy.on('window:alert', (text) => {
      expect(text).to.equal('User does not exist.')
    })
  })

  it('should show error for empty fields', () => {
    LoginPage.openLogin()
    cy.get('#loginusername').clear()
    cy.get('#loginpassword').clear()
    cy.contains('button', 'Log in').click()
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Please fill out Username and Password.')
    })
  })

})