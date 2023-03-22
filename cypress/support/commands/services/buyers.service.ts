Cypress.Commands.add('approveOrRefusedOrder', (investorId: string, orderId: string, body: object) => {
  cy.requestWithBody(`POST`, `${Cypress.env('sapUrl')}buyers/${investorId}/purchases/${orderId}/custodies-response`, body);
});

Cypress.Commands.add('uploadTaxes', (investorId: string, supplierGovernmentId: string, body: string) => {
  cy.requestWithBody(`POST`, `${Cypress.env('sapUrl')}buyers/${investorId}/sponsors/${supplierGovernmentId}/taxes`, body);
});
