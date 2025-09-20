const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://ticketazo.com.ar",
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});

