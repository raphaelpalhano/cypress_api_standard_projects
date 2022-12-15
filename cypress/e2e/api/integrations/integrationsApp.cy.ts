import integration from '../../../factory/integration';

describe('Given integrations at ms8', function () {
  before('Given my authentication with supplier', () => {
    cy.authSystem('supplier');
  });

  beforeEach('Create integration', function () {
    cy.postIntegration('integrations', integration.typesIntegrations('url_valid')).then((res) => {
      cy.wrap(res).as('response');
    });
  });

  it('When I get all integrations', function () {
    cy.getIntegrations('integrations').then((res) => {
      expect(res.body.data).length.above(0);
      expect(res.status).to.be.eq(200);
      cy.schemaValidation('integrations/allIntegrations.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I get specific integration', function () {
    cy.getSpecificIntegration('integrations', this.response.body.id).then((response) => {
      expect(response.status).to.be.eq(200);
      cy.schemaValidation('integrations/specificIntegrations.json', response.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I updated integration', function () {
    cy.updateSpecificIntegration('integrations', this.response.body.id, integration.typesIntegrations('text_valid')).then((response) => {
      expect(response.status).to.be.eq(200);
      cy.schemaValidation('integrations/updateIntegrations.json', response.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I updated with invalid key text', function () {
    cy.updateSpecificIntegration('integrations', this.response.body.id, integration.typesIntegrations('text_invalid')).then((response) => {
      expect(response.status).to.be.eq(400);
      cy.schemaValidation('integrations/badUpdateIntegrations.json', response.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  afterEach('delete integration', function () {
    cy.deleteIntegration('integrations', this.response.body.id).then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body.message).to.be.eq('Deleted successfully');
      cy.schemaValidation('integrations/deleteIntegration.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
