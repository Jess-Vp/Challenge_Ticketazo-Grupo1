
describe('Compra de entrada gratuita', () => {
  const EVENTO = 'Tesis Cervantes';
  const SECTOR = 'Auditorio';

  // Log con cta registrada 
  beforeEach(() => {
    cy.goToLogin()
    cy.wait(1000);
    cy.fillLoginForm({
      email: 'ruthprograma@gmail.com',
      password: 'Xacademy1*',
    });

    cy.clickLogin();
    cy.expectLoggedIn();


    cy.goToHome();
  });

  it('COMP-P0-001: Happy Path – Generar entrada gratuita', () => {
    // 1) Busqueda de evento
    cy.openEventDrawer(EVENTO);

    // 2) Click en "Adquirir entrada"
    cy.clickAcquire();

    // 3) Elegir sector "Auditorio"
    cy.selectSector(SECTOR);

    // 4) Seleccionar cualquier asiento disponible (naranja)
    cy.selectAnyAvailableSeat();

    // 5) Comprar 
    cy.clickComprar();

    // 6) Método de pago -> Generar entrada gratuita
    cy.generarEntradaGratuita();

    // 7) Validaciones finale en vista mi entradas + toast confirmacion
    cy.expectTicketCreated(EVENTO);
  });

  // Boton compea habilitacion
  it('COMP-P0-002: Botón Comprar habilita sólo con asiento', () => {
    cy.openEventDrawer(EVENTO);
    cy.clickAcquire();
    cy.selectSector(SECTOR);

    // debe estar deshabilitado sin selección
    cy.contains('button.bg-blue-500', /comprar/i).should('not.exist');

    cy.selectAnyAvailableSeat();
    cy.contains('button.bg-blue-500', /comprar\s*\(\d+\)/i).should('be.enabled');
  });

  
  // Asiento no disponible- seleccion
  it('COMP-P0-003: No se puede seleccionar asiento no disponible', () => {
    cy.openEventDrawer(EVENTO);
    cy.clickAcquire();
    cy.selectSector(SECTOR);

    // Intentar clickear un asiento "no disponible"
    const notAvailable = [
      'button.bg-red-500'
    ];

    cy.get('body').then(($b) => {
      const sel = notAvailable.find(s => $b.find(s).length > 0);
      if (!sel) {
        cy.log('No encontré asientos marcados como no disponibles en esta corrida; marco test como informativo.');
        return;
      }
      cy.contains('button.bg-blue-500', /comprar/i).then(($btn) => {
        const initialText = $btn.text();
        cy.get(sel).first().click({ force: true });
        // El contador no debe aumentar (texto igual)
        cy.contains('button.bg-blue-500', /comprar/i).invoke('text').should('eq', initialText);
      });
    });
  });


  // Fin de la compra - redireccion y toast 
  it('COMP-P0-006: Confirmación y redirección tras generar gratuita', () => {
    cy.openEventDrawer(EVENTO);
    cy.clickAcquire();
    cy.selectSector(SECTOR);
    cy.selectAnyAvailableSeat();
    cy.clickComprar();

    cy.generarEntradaGratuita();
    cy.expectTicketCreated(EVENTO);
  });
});
