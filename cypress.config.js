const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ngp6d3',
  e2e: {
    baseUrl: 'http://qamid.tmweb.ru',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
