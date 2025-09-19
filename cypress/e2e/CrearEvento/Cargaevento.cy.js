import 'cypress-file-upload';
describe('Cargar evento', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
  })


  it('Login como usuario cliente', () => {

    cy.get('[data-cy="input-email"]').type('yainmedina4@gmail.com');
    cy.get('[data-cy="input-password"]', { timeout: 10000 }).type('Flaquito412.', { force: true });
    cy.get('[data-cy="btn-login"]', { timeout: 10000 }).should('be.enabled').click({ force: true });

    //Esperar a que la sesión se cree
      cy.wait(1000);
  });

  
    it('Crear evento', () => {
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
  
      //Lugar de evento
      cy.get('[data-cy="select-lugar-evento"]').click();
      cy.get('[role="option"]').contains('Otro').click();
  
      //Completo formulario
      cy.get('[data-cy="input-nombre-lugar"]').type('Doma y folclore')
      cy.get('[data-cy="input-calle-lugar"]').type('Bulevard')
      cy.get('[data-cy="input-altura-lugar"]').type('549')
      cy.get('[data-cy="input-codigo-postal-lugar"]').type('5220')
  
      //  Seleccionar Provincia
      cy.get('[aria-label="Provincia"]').click();
      cy.contains('Córdoba').click();
  
      // Esperar a que se actualicen las opciones de localidad
      cy.wait(1000)
  
      //  Esperar a que el campo localidad se HABILITE (no solo que sea visible)
      cy.get('[aria-label="Localidad"]', { timeout: 10000 })
        .should('be.visible')
        .should('not.be.disabled')
  
      // seleccionar localidad
      cy.get('[aria-label="Localidad"]').click();
      cy.contains('Achiras').click();
  
      //Info
      cy.get('[data-cy="input-info"]').type('El evento se realizara al aire libre');
  
      cy.contains('Siguiente').click();
  
      //Activar/Desactivar switch de Preventa
      cy.get('[aria-label="Activar Preventa"]')
        .should('be.visible')
        .check() // Para activar
  
  
      //HTML, el texto "Seleccionar entrada" está dentro de un <span>, no directamente en el <button>.
      cy.get('button[data-slot="trigger"] span')
        .contains('Seleccionar entrada')
        .click({ force: true });
      // Paso 2: seleccionar la opción "General"
      cy.contains('li', 'General').click({ force: true });
  
      //  "Capacidad" 
      cy.get('input[aria-label="Capacidad"]').type('100');
  
      // "Precio de entrada" 
      cy.get('input[name="precioEntrada0"]').clear().type('150');
  
      //Precio preventa
      cy.get('input[name="precioPreventa0"]').clear().type('200');
  
      // "Cantidad Preventa"
      cy.get('input[name="cantidadPreventa0"]').clear().type('100');
  
      //fecha inicio
      cy.get('[data-slot="start-input"]').as('FechaInicio');
      cy.get('@FechaInicio').find('[data-type="day"]').type('30');
      cy.get('@FechaInicio').find('[data-type="month"]').type('10');
      cy.get('@FechaInicio').find('[data-type="year"]').type('2025');
  
      ////fecha fin
      cy.get('[data-slot="end-input"]').as('FechaFinal');
      cy.get('@FechaFinal').find('[data-type="day"]').type('27');
      cy.get('@FechaFinal').find('[data-type="month"]').type('11');
      cy.get('@FechaFinal').find('[data-type="year"]').type('2025');
  
      cy.wait(1000)
  
      cy.contains('Siguiente').click();
  
      cy.contains('Cargar Imagen Evento').click({ force: true });
  
      // 3. Seleccionar el input y subir la imagen
      cy.get('input[type="file"]').attachFile('imagenes/primaverafiesta.jpg');
  
      cy.contains('Siguiente').click({ force: true });
  
      cy.contains('Confirmar').click({ force: true });
  
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
      cy.get('[role="option"]').contains('Otro').click();
  
      //Completo formulario
      cy.get('[data-cy="input-nombre-lugar"]').type('Doma y folclore')
      cy.get('[data-cy="input-calle-lugar"]').type('Bulevard')
      cy.get('[data-cy="input-altura-lugar"]').type('549')
      cy.get('[data-cy="input-codigo-postal-lugar"]').type('5220')
  
      //  Seleccionar Provincia
      cy.get('[aria-label="Provincia"]').click();
      cy.contains('Córdoba').click();
  
      // Esperar a que se actualicen las opciones de localidad
      cy.wait(1000)
  
      //  Esperar a que el campo localidad se HABILITE (no solo que sea visible)
      cy.get('[aria-label="Localidad"]', { timeout: 10000 })
        .should('be.visible')
        .should('not.be.disabled')
  
      // seleccionar localidad
      cy.get('[aria-label="Localidad"]').click();
      cy.contains('Achiras').click();
  
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
  
      
      cy.contains('Siguiente').click();
  
    });
  
    it('Eliminar fecha y horario', () => {
      cy.visitNewEvent();
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
      cy.get('[role="option"]').contains('Otro').click();
  
      //Completo formulario
      cy.get('[data-cy="input-nombre-lugar"]').type('Plaza avellanela')
      cy.get('[data-cy="input-calle-lugar"]').type('Güemes')
      cy.get('[data-cy="input-altura-lugar"]').type('549')
      cy.get('[data-cy="input-codigo-postal-lugar"]').type('5220')
  
      //  Seleccionar Provincia
      cy.get('[aria-label="Provincia"]').click();
      cy.contains('Córdoba').click();
  
      // Esperar a que se actualicen las opciones de localidad
      cy.wait(1000)
  
      //  Esperar a que el campo localidad se HABILITE (no solo que sea visible)
      cy.get('[aria-label="Localidad"]', { timeout: 10000 })
        .should('be.visible')
        .should('not.be.disabled')
  
      // seleccionar localidad
      cy.get('[aria-label="Localidad"]').click();
      cy.contains('Achiras').click();
  
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
  
  
      cy.contains('Siguiente').click();
  
  
    });


})
