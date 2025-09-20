describe("Gestión de Usuarios Autorizados", () => {
  beforeEach(() => {
    cy.mockLogin();
    cy.visit("https://ticketazo.com.ar/editProfile");
  });

  it("Debería mostrar error si no se puede autorizar un usuario", () => {
    // Asegurate de usar selectores correctos acá:
    cy.get('[data-cy="input-email"], input[type="email"], input[placeholder*="Email"]')
      .should("exist")
      .type("admin@admin.com");

    cy.get('[data-cy="input-password"], input[type="password"], input[placeholder*="Contraseña"]')
      .should("exist")
      .type("contraseña", { log: false });

    // si necesitás nombre/teléfono también
    cy.get('input[placeholder*="Nombre"]')
      .should("exist")
      .type("Juan Adrian");

    cy.get('input[placeholder*="Tel"], input[type="tel"]')
      .should("exist")
      .type("3512012890");

    cy.get('[data-cy="btn-cargar"], button:contains("Cargar"), button:contains("Guardar")')
      .click();

    cy.contains("No se pudo autorizar al usuario")
      .should("be.visible");
  });
});
