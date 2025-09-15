
describe('Logeo de Usuario de Mercado Pago', { testIsolation: false }, () => {
  //Ingresar a la pagina ticketazo
  it ('Iniciar sesion con las credenciales',()=>{
    cy.visit ('https://www.mercadopago.com.ar/home');
    cy.get('[id=user_id]').type('TESTUSER2010833032')
    cy.get('.andes-login-form__submit').click()
    
  })
  //Ir a Login
  // Ingresar usuario y contraseña de Admin
  

  // Crear evento pago
  /*it('Cargar evento', () => {

  })*/
})
//Iniciar sesion sesion en mercado pago como tester
// Reservar asiento en evento
// Pagar con mercado pago



















/*
describe('Logeo de Usuario', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');

  })

  it('Login como usuario administrador', () => {

    cy.get('[data-cy="input-email"]').type('admin@admin.com');
    cy.get('[data-cy="input-password"]', { timeout: 10000 }).type('admin');
    cy.get('[data-cy="btn-login"]', { timeout: 10000 }).click();

  });

  it('Cargar evento', () => {

    cy.visitNewEvent();

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

    //Faltan valores en el combo 'lugar del evento': BUG REPORTADO
    //cy.get('[data-cy="select-lugar-evento"]').click();

    cy.get('[data-cy="input-info"]').type('El evento se realizara al aire libre');

    //No se puede realizar la carga de un evento ya que combo 'lugar del evento'es un campo obligatorio
    cy.contains('Siguiente').click();

  });

  //Casos negativos del formulario de registro
  it('Mostrar mensajes de error al enviar el formulario vacío', () => {
    cy.visitNewEvent();
    cy.contains('button', 'Siguiente').click();
    cy.get('[data-cy="input-titulo"]').parents('[data-slot="base"]').contains('El título no puede estar vacío.').should('be.visible');
    cy.get('[data-cy="select-edad"]').parents('[data-slot="base"]').contains('Debe seleccionar una opción de edad.').should('be.visible');
    cy.get('[data-cy="select-genero"]').parents('[data-slot="base"]').contains('Debe seleccionar un género para el evento.').should('be.visible');
    cy.get('[data-cy="select-lugar-evento"]').parents('[data-slot="base"]').contains('Debe seleccionar un lugar para el evento.').should('be.visible');
    cy.get('[data-cy="input-info"]').parents('[data-slot="base"]').contains('Debe agregar una descripción del evento.').should('be.visible');
    //para horario y duracion no se hacen las validaciones: BUG REPORTADO
    //se carga fecha predeterminada al ingresar al formulario: BUG REPORTADO

  });

  it('Evento con multiples fechas y horarios', () => {
    cy.visitNewEvent();
    cy.get('[aria-label="Evento con múltiples fechas y horarios"]')
      .click()

    cy.get('[data-cy="input-titulo"]').type('Fiestas de la primavera')

    cy.get('[data-cy="select-edad"]').click();
    cy.get('[data-cy="select-edad"]').type('ATP{enter}');

    cy.get('[data-cy="select-genero"]').click();
    cy.get('[role="option"]').contains('Fiesta').click();

    // Duración (primer campo)
    cy.get('[data-cy="input-duracion"]').click();
    cy.get('[data-type="hour"][role="spinbutton"]').eq(0).clear().type('15');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(0).clear().type('00');

    //Lugar de evento
    cy.get('[data-cy="select-lugar-evento"]').click();

    //Info
    cy.get('[data-cy="input-info"]').type('Los eventos son con entrada libre y gratuita');

    //Usar un alias para el contenedor principal Fecha 1
    cy.get('[data-cy="datepicker-fecha-0"]').as('fecha');
    cy.get('@fecha').find('[data-type="day"]').type('09').should('be.visible');
    cy.get('@fecha').find('[data-type="month"]').type('10').should('be.visible');
    cy.get('@fecha').find('[data-type="year"]').type('2025').should('be.visible');

    // Horario (segundo campo)
    cy.get('[data-cy="input-horario-0-0"]').click();
    cy.get('[data-type="hour"][role="spinbutton"]').eq(1).clear().type('18');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(1).clear().type('30');

    //Agregar otro horario (tercer campo)
    cy.get('.bg-primary').click()
    cy.get('[data-cy="input-horario-0-1"]').click()
    cy.get('[data-type="hour"][role="spinbutton"]').eq(2).clear().type('21');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(2).clear().type('30');

    //Agregar fecha 2
    cy.get('.mt-2 > .px-4').click()
    cy.get('[data-cy="datepicker-fecha-1"]').as('fecha');
    cy.get('@fecha').find('[data-type="day"]').type('21').should('be.visible');
    cy.get('@fecha').find('[data-type="month"]').type('10').should('be.visible');
    cy.get('@fecha').find('[data-type="year"]').type('2025').should('be.visible');
    //Agregar otro horario (cuarto campo)
    cy.get('[data-cy="input-horario-1-0"]').click()
    cy.get('[data-type="hour"][role="spinbutton"]').eq(3).clear().type('09');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(3).clear().type('30');

    //Faltan valores en el combo 'lugar del evento': BUG reportado
    cy.contains('Siguiente').click();

  });

  it('Eliminar fecha y horario', () => {
    
    cy.visitNewEvent();
    cy.get('[aria-label="Evento con múltiples fechas y horarios"]')
      .click()

    cy.get('[data-cy="input-titulo"]').type('Fiestas de la primavera')

    cy.get('[data-cy="select-edad"]').click();
    cy.get('[data-cy="select-edad"]').type('ATP{enter}');

    cy.get('[data-cy="select-genero"]').click();
    cy.get('[role="option"]').contains('Fiesta').click();

    // Duración (primer campo)
    cy.get('[data-cy="input-duracion"]').click();
    cy.get('[data-type="hour"][role="spinbutton"]').eq(0).clear().type('15');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(0).clear().type('00');

    //Lugar de evento
    cy.get('[data-cy="select-lugar-evento"]').click();

    //Info
    cy.get('[data-cy="input-info"]').type('Los eventos son con entrada libre y gratuita');

    //Usar un alias para el contenedor principal Fecha 1
    cy.get('[data-cy="datepicker-fecha-0"]').as('fecha');
    cy.get('@fecha').find('[data-type="day"]').type('09').should('be.visible');
    cy.get('@fecha').find('[data-type="month"]').type('10').should('be.visible');
    cy.get('@fecha').find('[data-type="year"]').type('2025').should('be.visible');

    // Horario (segundo campo)
    cy.get('[data-cy="input-horario-0-0"]').click();
    cy.get('[data-type="hour"][role="spinbutton"]').eq(1).clear().type('18');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(1).clear().type('30');

    //Agregar otro horario (tercer campo)
    cy.get('.bg-primary').click()
    cy.get('[data-cy="input-horario-0-1"]').click()
    cy.get('[data-type="hour"][role="spinbutton"]').eq(2).clear().type('21');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(2).clear().type('30');

    //Agregar fecha
    cy.get('.mt-2 > .px-4').click()
    cy.get('[data-cy="datepicker-fecha-1"]').as('fecha');
    cy.get('@fecha').find('[data-type="day"]').type('21').should('be.visible');
    cy.get('@fecha').find('[data-type="month"]').type('10').should('be.visible');
    cy.get('@fecha').find('[data-type="year"]').type('2025').should('be.visible');
    //Agregar otro horario (cuarto campo)
    cy.get('[data-cy="input-horario-1-0"]').click()
    cy.get('[data-type="hour"][role="spinbutton"]').eq(3).clear().type('09');
    cy.get('[data-type="minute"][role="spinbutton"]').eq(3).clear().type('30');

    //Eliminar fecha
    cy.get(':nth-child(2) > .flex.flex-row > .min-w-16').click()

    //Eliminar horario
    cy.get('.flex-wrap > :nth-child(2) > .z-0').click()

    //Faltan valores en el combo 'lugar del evento': BUG reportado
    cy.contains('Siguiente').click();
    

  });

})
*/