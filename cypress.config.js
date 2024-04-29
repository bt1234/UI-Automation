const { defineConfig } = require("cypress");

const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: 'p3uwae',
  env: {
    url: 'https://www.saucedemo.com/',
    username: 'standard_user',
    password: 'secret_sauce'
  },
  e2e: {
    setupNodeEvents,
    //specPattern: 'cypress/integration/examples/*.js'
    specPattern: 'cypress/integration/examples/**/*.{feature,js}'
  },
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 1,
  } 
});


