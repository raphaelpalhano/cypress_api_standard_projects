Cypress.Commands.add('uploadFees', (endpoint: string, filePath: string) => {
  cy.requestFormData('POST', `investors/api/v1/investors/${endpoint}`, filePath, 'file', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', {});
});

Cypress.Commands.add('getInvestors', (endpoint: string) => {
  cy.requestWithoutBody('GET', `investors/api/v1/investors/${endpoint}`);
});

Cypress.Commands.add('patchInvestors', (endpoint: string, body: object) => {
  cy.requestWithBody('PATCH', `investors/api/v1/investors/${endpoint}`, body);
});

Cypress.Commands.add('postInvestors', (endpoint: string, body: object) => {
  cy.requestWithBody('POST', `investors/api/v1/investors/${endpoint}`, body);
});
