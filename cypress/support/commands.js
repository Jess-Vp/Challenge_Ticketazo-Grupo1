
Cypress.Commands.add("mockLogin", () => {
  const token = "PON_TU_COOKIE_AUTH_TOKEN_AQUI";  // pegá el valor real que sacaste de Cookies
  cy.setCookie("authToken", token, {
    domain: "ticketazo.com.ar",
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/"
  });
});

