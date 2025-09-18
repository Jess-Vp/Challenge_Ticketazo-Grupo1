const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Base URL para no repetir la URL completa en cada cy.visit
    baseUrl: 'https://ticketazo.com.ar',

    // Archivo de soporte global
    supportFile: 'cypress/support/e2e.js',

    // Tamaño de ventana de navegador
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeout por defecto para comandos como cy.get()
    defaultCommandTimeout: 10000,

    // Setup de eventos Node si fuera necesario
    setupNodeEvents(on, config) {
      // Aquí se pueden agregar listeners o tareas personalizadas
      // Ejemplo: registrar logs, tareas de base de datos, etc.
    },
  },
});
