import LoginPage from '../pages/LoginPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import HomePage from '../pages/HomePage'

describe('Purchase Flow Tests',
  // This was just added an example, like we can retry the tests if they are flaky or application is not stable
  //I have commnented it as it is not needed for the current application and test setup
  // {
  //   retries: {
  //     runMode: 1,
  //     openMode: 1
  //   },
  // }, 
  () => {

    beforeEach(() => {
      cy.visit('/')

      cy.fixture('users').then((user) => {
        LoginPage.login(
          user.validUser.username,
          user.validUser.password
        )
      })

       LoginPage.verifyLoginSuccess()
    })

    it('should complete full purchase journey with single product (add > delete > re-add > checkout)', () => {

      cy.fixture('products').then((data) => {
        const product1 = data.product1
        const product2 = data.product2

        HomePage.selectProduct(product1)
        ProductPage.addToCart()
        ProductPage.handleAlert()
        HomePage.openCart()
        CartPage.verifyProduct(product1)
        CartPage.deleteProduct(product1)
        CartPage.verifyProductRemoved(product1)
        HomePage.gotoHome()
        HomePage.selectProduct(product2)
        ProductPage.addToCart()
        ProductPage.handleAlert()
        HomePage.openCart()
        CartPage.verifyProduct(product2)
        CartPage.placeOrder()
        const name = 'User' + (Date.now().toString().slice(0, 6))
        const card = Date.now().toString().slice(0, 12)
        CartPage.fillOrderForm(
          name,
          'Germany',
          'Berlin',
          card,
          '10',
          '2026'
        )
        CartPage.purchase()
        CartPage.verifySuccessPopup(name)
        CartPage.closePopup()

      })

    })

    it('should complete full purchase journey with multiple products (add > multiple products > checkout)', () => {

      cy.fixture('products').then((data) => {
        const product1 = data.product1
        const product2 = data.product2

        HomePage.selectProduct(product1)
        ProductPage.addToCart()
        ProductPage.handleAlert()
        HomePage.gotoHome()
        HomePage.selectProduct(product2)
        ProductPage.addToCart()
        ProductPage.handleAlert()
        HomePage.openCart()
        CartPage.verifyProduct(product1)
        CartPage.verifyProduct(product2)
        CartPage.placeOrder()
        const name = 'User' + (Date.now().toString().slice(0, 6))
        const card = Date.now().toString().slice(0, 12)
        CartPage.fillOrderForm(
          name,
          'Germany',
          'Berlin',
          card,
          '10',
          '2026'
        )
        CartPage.purchase()
        CartPage.verifySuccessPopup(name)
        CartPage.closePopup()
      })
    })
  })

