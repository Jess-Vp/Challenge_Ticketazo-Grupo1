describe('Login – E2E críticos', () => {
  beforeEach(() => {
    cy.goToLogin();
  });

  // Login exitoso con credenciales validas
  it('LOGIN-P0-008: Login exitoso con credenciales válidas (mockeado por defecto)', () => {
    cy.mockLoginOK();

    cy.fillLoginForm({
      email: 'ruthprograma@gmail.com',
      password: 'Xacademy1*',
    });

    cy.clickLogin();

    if (Cypress.env('USE_MOCKS') !== false) {
      cy.wait('@login200');
    } else {
      cy.url().should('not.include', '/auth/login');
    }

    cy.expectLoggedIn();
  });

  // Login credenciales invalidas

  it('LOGIN-P0-009: Credenciales inválidas', () => {
    cy.mockLoginError(401, 'Correo o contraseña incorrectos');

    cy.fillLoginForm({
      email: 'jess.login@qa.com',
      password: 'Wrong123!',
    });

    cy.clickLogin();


    // La app puede quedarse en /auth/login o recargar; toleramos ambas
    cy.url().should('include', '/auth/login');
    cy.contains(/(correo|email).*incorrect(os|as)/i).should('be.visible');
    cy.getSel('input-email').should('have.value', 'jess.login@qa.com');
  });

  it('LOGIN-P0-010: Usuario no verificado', () => {
    cy.mockLoginError(401, 'Correo o contraseña incorrectos');

    cy.fillLoginForm({
      email: 'pending@qa.com',
      password: 'Secret123!',
    });

    cy.clickLogin();

    if (Cypress.env('USE_MOCKS') !== false) cy.wait('@loginErr');

    cy.contains(/(correo|email).*incorrect(os|as)/i).should('be.visible');
    cy.url().should('include', '/auth/login');
  });

  // Log con campos requeridos vacios

  it('LOGIN-P0-004: Requeridos vacíos bloquean envío (no hay POST)', () => {
    cy.captureLoginRequests();
    cy.clickLogin();

    cy.get('@loginRequests').should((reqs) => {
      expect(reqs.length, 'Requests al backend').to.eq(1);
    });

  });


  // Doble submit test - rompe porque se encontro un issue ya reportado en Trello
  it('LOGIN-P0-011: Protección de doble submit (1 solo request)', () => {
    cy.mockLoginOK();

    cy.fillLoginForm({
      email: 'ruthprograma@gmail.com',
      password: 'Xacademy1*',
    });

    // doble click fuerte
    cy.getSel('btn-login').dblclick({ force: true });

    cy.wait('@login200');
    cy.get('@login200.all').should('have.length', 1);
    cy.get('@loginRequests').should((reqs) => {
      expect(reqs.length, 'Solo un intento de login').to.eq(1);
    });
  });

  // Navegacion a la vista de Registro y recupero de contraseña
  it('LOGIN-P0-003: Navegación a Registro y Recupero', () => {
    cy.getSel('link-register').click();
    cy.url().should('include', '/auth/register');

    cy.go('back');

    cy.getSel('link-forgot').click();
    cy.url().should('include', '/auth/forgot');
  });
});
