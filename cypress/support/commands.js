import './commands'


Cypress.Commands.add('visitNewEvent', () => {
  cy.visit('https://vps-3696213-x.dattaweb.com/newEvent');
});
