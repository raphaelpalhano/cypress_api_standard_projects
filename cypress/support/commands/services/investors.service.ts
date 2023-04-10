Cypress.Commands.add('uploadFees', (endpoint: string, filePath: string) => {
  cy.requestFormData(
    'POST',
    `proxy/investors/api/v1/investors/${endpoint}`,
    filePath,
    'file',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    {},
  );
});

Cypress.Commands.add('getInvestors', (endpoint: string) => {
  cy.requestWithoutBody('GET', `proxy/investors/api/v1/investors/${endpoint}`);
});

Cypress.Commands.add('getEnterprisesLimits', (endpoint: string, id: string, search = '', page = '', perPage = '', sort = '') => {
  cy.requestWithoutBody('GET', `proxy/investors/api/v1/investors/${id}/${endpoint}?search=${search}&page=${page}&perPage=${perPage}&sort=${sort}`);
});

Cypress.Commands.add('patchInvestors', (endpoint: string, body: object) => {
  cy.requestWithBody('PATCH', `proxy/investors/api/v1/investors/${endpoint}`, body);
});

Cypress.Commands.add('postInvestors', (endpoint: string, body: object) => {
  cy.requestWithBody('POST', `investors/api/v1/investors/${endpoint}`, body);
});
