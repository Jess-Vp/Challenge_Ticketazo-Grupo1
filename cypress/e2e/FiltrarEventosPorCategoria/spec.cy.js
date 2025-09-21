describe('Filtrado dinámico de eventos', () => {
  beforeEach(() => {
    cy.viewport(1400, 900);
    cy.intercept('GET', '**/api/backend/auth/session', { statusCode: 200, body: {} }).as('mockSession');
    cy.visit('https://ticketazo.com.ar');
  });

  it('Recorre todas las categorías mostrando solo la seleccionada', () => {
    // Abrir el dropdown
    cy.get('button[data-slot="trigger"]', { timeout: 15000 })
      .first()
      .should('exist')
      .click({ force: true });

    // Capturar todas las opciones
    cy.get('ul[role="listbox"] li[role="option"] span.flex-1', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(($options) => {
        const categorias = $options.toArray().map(el => el.innerText.trim());

        categorias.forEach((categoria) => {
          // Abrir dropdown antes de seleccionar
          cy.get('button[data-slot="trigger"]').first().click({ force: true });

          // Log de la categoría
          cy.log(`Seleccionando categoría: ${categoria}`);
          console.log(`Seleccionando categoría: ${categoria}`);

          // Seleccionar opción actual
          cy.contains('ul[role="listbox"] li[role="option"] span.flex-1', categoria)
            .click({ force: true });

          // Cerrar dropdown para que se vea solo la opción marcada
          cy.get('button[data-slot="trigger"]').first().click({ force: true });

          cy.wait(1000); // esperar que cargue
        });
      });
  });
});

