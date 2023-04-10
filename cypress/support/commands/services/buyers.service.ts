Cypress.Commands.add('approveOrRefusedOrder', (investorId: string, orderId: string, body: object) => {
  cy.requestWithBody(`POST`, `${Cypress.env('sapUrl')}buyers/${investorId}/purchases/${orderId}/custodies-response`, body);
});

Cypress.Commands.add('approveOrUnapproveBuyOrder', (investorId: string, orderId: string, changeOperation: string) => {
  cy.requestWithoutBody(`POST`, `${Cypress.env('sapUrl')}buyers/${investorId}/signatures/${orderId}/${changeOperation}`);
});

Cypress.Commands.add('uploadTaxes', (investorId: string, supplierGovernmentId: string, body: string) => {
  cy.requestWithBody(`POST`, `api/v1/buyers/${investorId}/sponsors/${supplierGovernmentId}/taxes`, body);
});

Cypress.Commands.add('downloadTermOfCession', (investorId: string, orderId: string) => {
  cy.requestWithoutBody(`GET`, `api/v1/buyers/${investorId}/signatures/${orderId}/documents`);
});
