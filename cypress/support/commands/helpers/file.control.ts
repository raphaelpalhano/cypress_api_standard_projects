import { faker } from '@faker-js/faker';
import { dataIncrement } from '../../../support/commands/helpers/string.control';
import * as invoiceData from '../../../fixtures/static/invoiceData.json';
import * as path from '../../../fixtures/static/path.json';

Cypress.Commands.add('converterToJson', (file: string) => {
  cy.readFile(`cypress/fixtures/${file}`, 'latin1').then((text) => {
    let lines = text.split('\n');
    let result = [];
    let headers = lines[0].split(';');
    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(';');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    // console.log(result)
    return result;
  });
});

Cypress.Commands.add('createInvoiceCsv', () => {
  const header = 'Nota Fiscal;ExternalID;Emissão;Vencimento;Valor;CNPJ;Fornecedor\n';
  let ntFiscal = `${faker.finance.routingNumber()}-${faker.datatype.bigInt({ min: 1000, max: 2000 })}`;
  let date = dataIncrement(5);
  cy.writeFile(path.csv, header, 'latin1');
  let invoice =
    `${ntFiscal};` +
    `${ntFiscal}${invoiceData.document};` +
    `${dataIncrement(0)};` +
    `${date};` +
    `${faker.datatype.float({ min: 1000, max: 1000000 })};` +
    `${invoiceData.document};` +
    `${invoiceData.supplierName}`;
  cy.writeFile(path.csv, invoice, 'latin1', { flag: 'a+' });
});
