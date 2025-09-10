describe('Logeo de Usuario', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');

  })


  it('Login como usuario administrador', () => {

    cy.get('[data-cy="input-email"]').type('admin@admin.com');
    cy.get('[data-cy="input-password"]', { timeout: 10000 }).type('admin');
    cy.get('[data-cy="btn-login"]', { timeout: 10000 }).click();

  });

  it('Ingreso a nuevo evento', () => {


    cy.visit('https://vps-3696213-x.dattaweb.com/newEvent');
    //titulo
    cy.get('[data-cy="input-titulo"]').type('Escuela de rock')
    //Usar un alias para el contenedor principal FECHA
    cy.get('[data-cy="datepicker-fecha"]').as('fecha');
    cy.get('@fecha').find('[data-type="day"]').type('09').should('be.visible');
    cy.get('@fecha').find('[data-type="month"]').type('10').should('be.visible');
    cy.get('@fecha').find('[data-type="year"]').type('2025').should('be.visible');

    // Abrir select de edad - Solución 3: Simular teclado en lugar de click
    cy.get('[data-cy="select-edad"]').click();
    cy.get('[data-cy="select-edad"]').type('ATP{enter}');

    // Abrir select de género Buscar la opción dentro del dropdown abierto
    cy.get('[data-cy="select-genero"]').click();
    cy.get('[role="option"]').contains('Fiesta').click();


    // Horario (primer campo)
    cy.get('[data-cy="input-horario"]').click();
    cy.get('[data-type="hour"][role="spinbutton"]').eq(0).clear().type('14');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(0).clear().type('30');

    // Duración (segundo campo)
    cy.get('[data-cy="input-duracion"]').click();
    cy.get('[data-type="hour"][role="spinbutton"]').eq(1).clear().type('03');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(1).clear().type('30');

    //Lugar de evento
    //cy.get('[data-cy="select-lugar-evento"]').click();


    //Info
    cy.get('[data-cy="input-info"]').type('El evento se realizara al aire libre');



  });


})
