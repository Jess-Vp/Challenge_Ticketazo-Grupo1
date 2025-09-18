// Ignorar errores de React minificados y 403 de sesión
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('403')) return false;
  return false; 
});

describe('Registro de usuario nuevo', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser');
    cy.get('input[name="nombres"]', { timeout: 20000 }).should('be.visible');
  });

  it('Completa y envía el formulario con confirmación simulada', () => {
    const dni = `${Date.now()}`.slice(-8);
    const email = `qa+${Date.now()}@ejemplo.com`;
    const password = 'Password123*';

    // Datos personales
    cy.get('input[name="nombres"]').should('be.visible').clear().type('Usuario');
    cy.get('input[name="apellido"]').should('be.visible').clear().type('Nuevo');
    cy.get('input[name="telefono"]').should('be.visible').clear().type('2616885427');
    cy.get('[data-cy="input-dni"]').should('be.visible').clear().type(dni);

    // Provincia
    cy.get('[data-cy="select-provincia"]')
      .should('be.visible')
      .clear()
      .type('Córdoba');

    cy.get('ul[role="listbox"] li')
      .contains('Córdoba')
      .click();

    // Localidad
    cy.get('[data-cy="select-localidad"]')
      .should('be.visible')
      .clear()
      .type('Agua de Oro');

    cy.get('ul[role="listbox"] li')
      .contains('Agua de Oro')
      .click();

    // Fecha nacimiento
    cy.get('div[role="spinbutton"][data-type="day"]').should('be.visible').clear().type('25');
    cy.get('div[role="spinbutton"][data-type="month"]').should('be.visible').clear().type('05');
    cy.get('div[role="spinbutton"][data-type="year"]').should('be.visible').clear().type('1980');

    // Datos de acceso
    cy.get('input[name="email"]').should('be.visible').clear().type(email);
    cy.get('input[name="confirmarEmail"]').should('be.visible').clear().type(email);
    cy.get('input[name="password"]').should('be.visible').clear().type(password);
    cy.get('[data-cy="input-repetir-password"]').should('be.visible').clear().type(password);

    // Intercepta el POST de registro
   cy.intercept('POST', '/api/backend/register/register-user').as('registroUsuario');
    
    // Mock del POST de registro para simular éxito sin depender del backend real
    cy.intercept('POST', '/api/backend/register/register-user', (req) => {
    req.reply({
    statusCode: 201,
    body: { 
      message: 'Usuario registrado con éxito. Por favor, verifica tu correo electrónico para activar tu cuenta.' 
    }
  });
}).as('registroUsuario');

    // Captura alerta
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Usuario registrado con éxito');
    });
    
    //Clic en registrarse
    cy.get('[data-cy="btn-registrarse"]').should('be.visible').click();

    // Espera el POST de registro completo
    cy.wait('@registroUsuario');

    // Valida redirección a login
    cy.url({ timeout: 20000 }).should('include', '/auth/login');
  });
});
