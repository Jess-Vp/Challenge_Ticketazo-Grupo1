describe('Logearse, crear un evento y pagarlo', { testIsolation: true }, () => {
  //Ingresar a la pagina ticketazo
  it ('Iniciar sesion con Admin',()=>{
    cy.visit('https://ticketazo.com.ar/auth/login')
    cy.get('[data-cy="input-email"]').type('agusdonalisio@gmail.com')
    cy.get('[data-cy="input-password"]').type('123456789Ad.')
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(1000)
    cy.visit('https://ticketazo.com.ar/newEvent')
    cy.get('[data-cy="input-titulo"]').type('Evento Pago para Mercado Pago')

    let date = new Date();
    date.setDate(date.getDate() + 2) // sumar 2 dia

    cy.get('[data-cy="datepicker-fecha"]').as('fecha');
    cy.get('@fecha').find('[data-type="day"]').type(date.getDate()).should('be.visible');
    cy.get('@fecha').find('[data-type="month"]').type(date.getMonth() + 1).should('be.visible');
    cy.get('@fecha').find('[data-type="year"]').type(date.getFullYear()).should('be.visible');
    
    
    cy.get('[data-cy="select-edad"]').click()
    //cy.get('[data-cy="option-edad-ATP"]').click()
    cy.get('[data-cy="option-edad-+18"]').click()
    cy.get('[data-cy="select-genero"]').click()
    cy.get('[data-cy="option-genero-Recital"]').click()
    cy.get('[data-cy="input-horario"]').as('horario')
    cy.get('@horario').find('[data-type="hour"]').type('02:00').should('be.visible')
    cy.get('[data-cy="input-duracion"]').find('[data-type="hour"]').type('02:00').should('be.visible')
    cy.get('[data-cy="select-lugar-evento"]').click()
    cy.get('[data-cy="option-lugar-7"]').click()
    cy.get('[data-cy="input-nombre-lugar"]').type('Plaza de la Musica')
    cy.get('[data-cy="input-calle-lugar"]').type('calle')
    cy.get('[data-cy="input-altura-lugar"]').type('1234')    
    cy.get('[data-cy="input-codigo-postal-lugar"]').type('5003')
    cy.get('[name="provincia"]').click()
    cy.get('[data-key="14"]').click()
    cy.get('input[placeholder="Seleccione una localidad"]').click()//.type('Agua de Oro').should('have.value', 'Agua de Oro');
    cy.contains('li', 'Agua de Oro').should('be.visible').click();
    cy.get('[data-cy="input-info"]').type('Evento para poder pagar con mercado pago iniciado')

    cy.wait(1000)

    cy.contains('Siguiente').click()
    cy.get('button[aria-haspopup="listbox"]').click(); // 1. Abrir el dropdown
    cy.contains('li', 'VIP').should('be.visible').click();
    cy.get('[name="capacidadEntrada0"]').type(2000)
    cy.get('[name="precioEntrada0"]').type('20000')
    cy.contains('Siguiente').click()


    //imagen
    
    cy.contains('Siguiente').click()
    cy.contains('Confirmar').click()


     //cy.on('window:alert', (text) => {expect(text).to.contains('Error al crear evento');});
    cy.contains('Error al crear evento').should('be.visible')
    cy.intercept('POST', '/api/backend/events/create-event').as('crearEvento')
    cy.contains('Confirmar').click()
    cy.wait('@crearEvento').then((intercept) => {
    expect(intercept.response.statusCode).to.eq(400)
    })
  })
  
})



