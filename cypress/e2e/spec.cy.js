describe("Login en Ticketazo", () => {
  it("Debería iniciar sesión con credenciales válidas", () => {
    cy.login("admin@admin.com", "admin");

    // Verificamos redirección
    cy.url().should("include", "/mis-eventos");

    // Verificamos contenido esperado post-login
    cy.contains("Mis entradas").should("be.visible");
  });
});


