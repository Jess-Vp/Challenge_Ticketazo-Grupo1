// Navegar a la pantalla de registro (usa baseUrl del config)
Cypress.Commands.add('goToRegister', () => {
  cy.visit('https://ticketazo.com.ar/auth/registerUser');
});


// Seleccion de (Provincia / Localidad): tipear y confirmar con Enter
Cypress.Commands.add('comboSelect', (selector, text) => {
  cy.get(selector).clear().type(`${text}{enter}`);
});

// Fecha segmentada: dd/mm/aaaa (tus 3 segments content editable)
Cypress.Commands.add('setBirthDate', (dd, mm, yyyy) => {
  cy.get('[data-type="day"]').clear().type(dd);
  cy.get('[data-type="month"]').clear().type(mm);
  cy.get('[data-type="year"]').clear().type(yyyy);
});

// Relleno de formularios
Cypress.Commands.add('fillValidRegisterForm', (overrides = {}) => {
  const data = {
    nombres: 'Jessica',
    apellido: 'Puricelli',
    telefono: '1155512345',  // 10 dígitos
    dni: Math.floor(10000000 + Math.random() * 90000000),          // 8 dígitos
    provincia: 'Buenos Aires',
    localidad: 'La Plata',
    day: '10', month: '10', year: '1995', // mayor de edad
    email: 'jess@qa.com',
    pass: 'Secret123!',
    ...overrides
  };

  cy.get('[data-cy="input-nombres"]').clear().type(data.nombres);
  cy.get('[data-cy="input-apellido"]').clear().type(data.apellido);
  cy.get('[data-cy="input-telefono"]').clear().type(data.telefono);
  cy.get('[data-cy="input-dni"]').clear().type(data.dni);

  cy.comboSelect('[data-cy="select-provincia"]', data.provincia);
  cy.comboSelect('[data-cy="select-localidad"]', data.localidad);

  cy.setBirthDate(data.day, data.month, data.year);

  cy.get('[data-cy="input-email"]').clear().type(data.email);
  cy.get('[data-cy="input-confirmar-email"]').clear().type(data.email);

  cy.get('[data-cy="input-password"]').clear().type(data.pass);
  cy.get('[data-cy="input-repetir-password"]').clear().type(data.pass);
});

//Check campos maxlength: el campo no debe aceptar más de N chars
Cypress.Commands.add('assertMaxLength', (selector, attemptValue, expectedLen) => {
  cy.get(selector).clear().type(attemptValue);
  cy.get(selector).invoke('val').then(v => {
    expect(String(v).length, `${selector} maxlength`).to.eq(expectedLen);
  });
});


// Esperar/validar el texto del alert nativo del navegador
Cypress.Commands.add('expectAlertContains', (expectedTexts) => {
  cy.on('window:alert', (text) => {
    (Array.isArray(expectedTexts) ? expectedTexts : [expectedTexts]).forEach(t => {
      expect(text).to.contain(t);
    });
  });
});


// Contar cantidad de requests de registro (para doble submit)
Cypress.Commands.add('captureRegisterRequests', () => {
  const requests = [];
  cy.intercept('POST', '**/auth/register**', (req) => {
    requests.push(req);
  }).as('regAny');
  cy.wrap(requests).as('regRequests'); // alias con el array de reqs
});

// 422: duplicado u otros errores de validación
Cypress.Commands.add('mockRegister422', (body = { errors: { email: ['Duplicado'] } }) => {
  cy.intercept('POST', '**/auth/register**', {
    statusCode: 422,
    body
  }).as('reg422');
});

//Visit new event Meli
Cypress.Commands.add('visitNewEvent', () => {
  cy.visit('https://vps-3696213-x.dattaweb.com/newEvent');
});

// --- Utils de logging ---
const logReq = (label) => (req) => {
  // Ayuda a debuggear en el runner
  // eslint-disable-next-line no-console
  console.log(`[${label}]`, req.method, req.url, req.body);
};

// --- Selectores robustos ---
Cypress.Commands.add('getSel', (key) => {
  const map = {
    'input-email': ['[data-cy="input-email"]', 'input[type="email"]'],
    'input-password': ['[data-cy="input-password"]', 'input[type="password"]', '[name="password"]'],
    'btn-login': ['[data-cy="btn-login"]', 'button[type="submit"]'],
    'link-register': ['[data-cy="link-register"]', 'a[href*="/auth/register"]', 'a[href*="/auth/registerUser"]'],
    'link-forgot': ['[data-cy="link-forgot"]', 'a[href*="/auth/forgot"]'],
  };

  const candidates = map[key];
  if (!candidates) throw new Error(`getSel: clave desconocida "${key}"`);

  const tryOne = (selectors, idx = 0) => {
    if (idx >= selectors.length) throw new Error(`No se encontró selector para "${key}"`);
    const sel = selectors[idx];

    return cy.get('body').then(($body) => {
      if ($body.find(sel).length) return cy.get(sel);
      // fallback especial para textos de botones/enlaces
      if (key === 'btn-login') return cy.contains('button, [role="button"]', /login|iniciar sesión/i);
      if (key === 'link-register') return cy.contains('a', /registrar|registrate|crear cuenta/i);
      if (key === 'link-forgot') return cy.contains('a', /olvidaste.*contraseña|recuperar/i);

      return tryOne(selectors, idx + 1);
    });
  };

  return tryOne(candidates);
});

// --- Navegación ---
Cypress.Commands.add('goToLogin', () => {
  cy.visit('https://ticketazo.com.ar/auth/login', { failOnStatusCode: false });
});

// --- Form helpers ---
Cypress.Commands.add('fillLoginForm', ({ email, password }) => {
  cy.wait(1000);
  cy.getSel('input-email').clear().type(email, { delay: 0 });
  cy.getSel('input-password').clear().type(password, { delay: 0 });
});

Cypress.Commands.add('clickLogin', () => {
  cy.getSel('btn-login').click({ force: true });
});

Cypress.Commands.add('expectLoggedIn', () => {
  cy.url().should('not.include', '/auth/login');
});

// --- Patrón flexible del endpoint de login ---
const LOGIN_URL_PATTERN = '**/auth/**';

// --- Toggle de mocks ---
const useMocks = () => Cypress.env('USE_MOCKS') !== false;

// Respuesta 200 
Cypress.Commands.add('mockLoginOK', (body = { token: 'fake-token' }) => {
  cy.intercept('POST', LOGIN_URL_PATTERN, (req) => {
    Cypress.log({ name: 'login200 match', message: req.url }); // 👈 LOG
    req.reply({ statusCode: 200, body });
  }).as('login200');
});

// Debe tomar el error genérico
Cypress.Commands.add('mockLoginError', (statusCode = 401, body = {}) => {
  if (!useMocks()) return;
  cy.intercept('POST', LOGIN_URL_PATTERN, (req) => {
    logReq('loginErr')(req);
    req.reply({ statusCode, body });
  }).as('loginErr');
});

// Capturar cualquier request para contarlas (doble submit)
Cypress.Commands.add('captureLoginRequests', () => {
  const requests = [];
  cy.intercept({ method: 'POST', url: LOGIN_URL_PATTERN }, (req) => {
    requests.push(req);
    logReq('anyLogin')(req);
  }).as('anyLogin');
  cy.wrap(requests, { log: false }).as('loginRequests');
});
