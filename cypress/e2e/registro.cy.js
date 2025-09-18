// Evitar que errores de React rompan los tests
Cypress.on('uncaught:exception', () => false);

describe('Registro de usuario nuevo', () => {
  beforeEach(() => {
    // Usando baseUrl de cypress.config.js
    cy.visit('/auth/registerUser');
  });

  it('Debe permitir registrar un usuario nuevo con datos válidos', () => {
    const password = 'Password124*';
    const uniqueDni = `${Date.now()}`.slice(-8);
    const uniqueEmail = `usuarioNuevo${Date.now()}@ejemplo.com`;

    // Datos personales
    cy.get('input[name="nombres"]').type('Usuario');
    cy.get('input[name="apellido"]').type('Nuevo');
    cy.get('input[name="telefono"]').type('261688542');
    cy.get('input[name="dni"]').type(uniqueDni);

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
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="confirmarEmail"]').type(uniqueEmail);
    cy.get('input[name="password"]').type(password);
    cy.get('[data-cy="input-repetir-password"]').type(password);

    // Enviar formulario
    cy.contains('button', 'Registrarse').click();

    // Validación post-envío
    cy.contains(/registro exitoso/i).should('be.visible');
  });
});
