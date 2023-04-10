import { defineConfig } from 'cypress';

const fs = require('fs');

module.exports = defineConfig({
  projectId: '6uxwi3',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    html: true,
    json: true,
    embeddedScreenshots: true,
    reportDir: './reports',
    reportPageTitle: 'My Suppliers Report',
    reportTitle: 'Report Ms8 Project',
  },
  e2e: {
    video: false,
    viewportWidth: 1600,
    viewportHeight: 900,
    chromeWebSecurity: false,
    numTestsKeptInMemory: 5,
    excludeSpecPattern: '*.js',
    pageLoadTimeout: 10000,
    defaultCommandTimeout: 10000,
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',

    async setupNodeEvents(on, config) {
      return require('./cypress/env/index')(on, config);
    },
  },
  env: {
    cognito: 'https://cognito-idp.us-east-1.amazonaws.com/',
    CYPRESS_RECORD_KEY: '077d3cc1-0295-4f01-9993-5cef3af25bef',
    TAGS: 'not @ignore',
  },
});
