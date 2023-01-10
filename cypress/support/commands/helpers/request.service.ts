/**
 * @params
 * first - originalFunction: request original
 * second - options: object cy.request({}) checking if have used one object
 *
 * @conditionals
 * if object parameter equals one {}
 * if environment variable token exist
 *
 * @setToken
 * first object response:  options[0].headers
 *
 * @return
 * originalFunction with parameters: options
 *
 */

Cypress.Commands.overwrite('request', (originalFunction, ...options) => {
  if (options.length === 1) {
    if (Cypress.env('COGNITO_TOKEN')) {
      options[0].headers = {
        Authorization: `Bearer ${Cypress.env('COGNITO_TOKEN')}`,
      };
    }
  }

  return originalFunction(...options);
});
