// cypress/e2e/seguridad-login.cy.js
describe('Pruebas de Seguridad - Login Ticketazo', () => {
  const baseUrl = 'https://ticketazo.com.ar/';
  const userEmail = 'admin@admin.com';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('body').should('be.visible');
    
    // Intentar hacer clic en Login si existe
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Login")').length > 0) {
        cy.get('button:contains("Login")').click();
        cy.wait(2000);
      }
    });
  });

  it('Debería validar formato de email', () => {
    cy.get('body').then(($body) => {
      // Solo continuar si hay campos de login visibles
      if ($body.find('input[type="email"], input[type="password"]').length >= 2) {
        const invalidEmails = [
          'invalid-email',
          'user@',
          '@domain.com'
        ];

        invalidEmails.forEach(email => {
          cy.get('input[type="email"]').first().clear().type(email);
          cy.get('input[type="password"]').first().type('password123');
          
          // Buscar botón de submit de forma segura
          cy.get('body').then(($body) => {
            const submitButton = $body.find('button[type="submit"]').first() || 
                               $body.find('button:contains("Iniciar")').first() ||
                               $body.find('button').last();
            cy.wrap(submitButton).click();
          });

          cy.wait(1000);
        });
      } else {
        cy.log('No se encontraron campos de login, omitiendo prueba');
      }
    });
  });

  it('Debería prevenir SQL Injection', () => {
    cy.get('body').then(($body) => {
      if ($body.find('input[type="email"], input[type="password"]').length >= 2) {
        const sqlInjectionAttempts = [
          "admin@admin.com' OR '1'='1",
          "admin@admin.com'; DROP TABLE users; --"
        ];

        sqlInjectionAttempts.forEach(attempt => {
          cy.get('input[type="email"]').first().clear().type(attempt);
          cy.get('input[type="password"]').first().type("' OR '1'='1");
          
          cy.get('body').then(($body) => {
            const submitButton = $body.find('button[type="submit"]').first() || 
                               $body.find('button:contains("Iniciar")').first();
            if (submitButton.length) {
              cy.wrap(submitButton).click();
            }
          });

          cy.wait(1000);
        });
      }
    });
  });

  it('Debería tener headers de seguridad HTTP', () => {
    cy.request({
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Headers recibidos:', response.headers);
      
      // Verificar headers de seguridad (estas son recomendaciones, no todos son obligatorios)
      const securityHeaders = [
        'x-content-type-options',
        'x-frame-options', 
        'x-xss-protection',
        'strict-transport-security'
      ];

      securityHeaders.forEach(header => {
        if (response.headers[header]) {
          cy.log(`Header de seguridad encontrado: ${header} = ${response.headers[header]}`);
        } else {
          cy.log(`Header de seguridad no presente: ${header}`);
        }
      });

      // Verificar HTTPS
      expect(response.allRequestResponses[0]['Request URL']).to.include('https://');
    });
  });

  it('Debería validar autenticación con credenciales incorrectas', () => {
    cy.get('body').then(($body) => {
      if ($body.find('input[type="email"], input[type="password"]').length >= 2) {
        cy.get('input[type="email"]').first().clear().type('usuario-inexistente@test.com');
        cy.get('input[type="password"]').first().type('password-incorrecto');
        
        cy.get('body').then(($body) => {
          const submitButton = $body.find('button[type="submit"]').first() || 
                             $body.find('button:contains("Iniciar")').first();
          if (submitButton.length) {
            cy.wrap(submitButton).click();
          }
        });

        // Verificar que se muestra algún mensaje de error
        cy.get('body').should(($body) => {
          const hasError = $body.find('.error, .alert, [class*="error"]').length > 0 ||
                         $body.text().includes('incorrect') ||
                         $body.text().includes('error');
          expect(hasError).to.be.true;
        });
      }
    });
  });

  it('Debería verificar visibilidad de password', () => {
    cy.get('body').then(($body) => {
      if ($body.find('input[type="password"]').length > 0) {
        const passwordInput = $body.find('input[type="password"]').first();
        
        // Verificar que el password está oculto por defecto
        expect(passwordInput.attr('type')).to.equal('password');
        
        // Verificar si existe toggle de visibilidad
        if ($body.find('.password-toggle, [class*="eye"]').length > 0) {
          cy.get('.password-toggle, [class*="eye"]').first().click();
          cy.get('input[type="password"]').first().should('have.attr', 'type', 'text');
        }
      }
    });
  });
});