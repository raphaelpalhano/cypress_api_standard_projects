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
