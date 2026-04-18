const { defineConfig } = require("cypress")
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    viewportWidth: 1280,
    viewportHeight: 720,
    supportFile: false,
    pageLoadTimeout: 60000,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: true
  }
})