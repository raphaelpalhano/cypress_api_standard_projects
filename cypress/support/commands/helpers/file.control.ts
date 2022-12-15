import { faker } from '@faker-js/faker';
import { dataIncrement } from '../../../support/commands/helpers/string.control';

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

// Cypress.Commands.add('createInvoiceCsv', (document) => {
//   const header = 'Nota Fiscal;ExternalID;Emissão;Vencimento;Valor;CNPJ;Fornecedor\n';
//   let num1 = faker.finance.routingNumber();
//   let num2 = faker.datatype.bigInt({ min: 1000, max: 2000 });
//   let date = dataIncrement(5);
//   let invoice =
//     `${num1}-${num2};` +
//     `${num1}-${num2}${invoiceData.document};` +
//     `${invoiceData.creatDate};` +
//     `${date};` +
//     `${invoiceData.value};` +
//     `${document};` +
//     `${invoiceData.supplierName}`;

//   cy.writeFile(path.csv, header, 'latin1');
//   cy.writeFile(path.csv, invoice, 'latin1', { flag: 'a+' });
// });
