// Evitar que errores de React rompan los tests
Cypress.on('uncaught:exception', () => false);

describe('Validar que no se repitan DNI y no deje registrar', () => {
  beforeEach(() => {
    cy.visit('/auth/registerUser'); // usa baseUrl de cypress.config.js
  });

  it('No debe permitir registrar con un DNI ya existente', () => {
    const password = 'Password123*';

    // Datos personales
    cy.get('input[name="nombres"]').type('Tester');
    cy.get('input[name="apellido"]').type('Duplicado');
    cy.get('input[name="telefono"]').type('2616885427');

    // DNI fijo ya registrado
    cy.get('input[name="dni"]').type('20858801');

    // Provincia y localidad
    cy.get('[data-cy="select-provincia"]').click().should('be.visible');
    cy.contains('Mendoza').click();

    cy.get('[data-cy="select-localidad"]').click().type('Mendoza');
    cy.contains('.cursor-pointer', 'Mendoza').click();

    // Fecha de nacimiento
    cy.get('input[placeholder="dd"]').type('25');
    cy.get('input[placeholder="mm"]').type('05');
    cy.get('input[placeholder="aaaa"]').type('1980');

    // Credenciales
    cy.get('input[name="email"]').type('duplicado@ejemplo.com');
    cy.get('input[name="confirmarEmail"]').type('duplicado@ejemplo.com');
    cy.get('input[name="password"]').type(password);
    cy.get('[data-cy="input-repetir-password"]').type(password);

    // Enviar formulario
    cy.contains('button', 'Registrarse').click();

    // Validar mensaje de error
    cy.contains(/usuario registrado con ese dni/i).should('be.visible');
  });
});
