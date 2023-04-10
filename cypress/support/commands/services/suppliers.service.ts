Cypress.Commands.add('getSupplierInfo', (endpoint: string, id: any) => {
  cy.requestWithoutBody(`GET`, `proxy/suppliers/api/v1/${endpoint}/${id}`);
});
