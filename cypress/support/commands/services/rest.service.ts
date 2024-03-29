import * as FormData from 'form-data';

Cypress.Commands.add('requestWithBody', (method: string, endpoint: string, body: any, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) => {
  const log = Cypress.log({
    displayName: 'requestWithBody',
    message: [`Request for post/path/put/delete`],
    // @ts-ignore
    autoEnd: false,
  });

  log.snapshot('before');

  cy.log('requestWithBody', {
    methodHttp: method,
    route: `${endpoint}`,
    requestBody: body,
  });

  cy.request({
    method,
    url: `${endpoint}`,
    body,
    failOnStatusCode,
    timeout,
    log: true,
  });

  log.snapshot('after');
  log.end();
});

Cypress.Commands.add(
  'requestWithBodyAndHeader',
  (method: string, endpoint: string, body: any, header: any, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) => {
    const log = Cypress.log({
      displayName: 'requestWithBodyAndHeader',
      message: [`Request for post/path/put/delete with header`],
      // @ts-ignore
      autoEnd: false,
    });

    log.snapshot('before');

    cy.log('requestWithBodyAndHeader', {
      methodHttp: method,
      route: `${endpoint}`,
      requestBody: body,
    });

    cy.request({
      method,
      url: `${endpoint}`,
      headers: {
        header,
      },
      body,
      failOnStatusCode,
      timeout,
      log: true,
    });

    log.snapshot('after');
    log.end();
  },
);

Cypress.Commands.add(
  'requestFormUrlEncoded',
  (method: string, endpoint: string, body: any, header: any, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) => {
    const log = Cypress.log({
      displayName: 'requestWithBodyAndHeader',
      message: [`Request for post/path/put/delete with header`],
      // @ts-ignore
      autoEnd: false,
    });

    log.snapshot('before');

    cy.log('requestWithBodyAndHeader', {
      methodHttp: method,
      route: `${endpoint}`,
      requestBody: body,
    });

    cy.request({
      method,
      url: `${endpoint}`,
      headers: {
        header,
      },
      form: true,
      body,
      failOnStatusCode,
      timeout,
      log: true,
    });

    log.snapshot('after');
    log.end();
  },
);

Cypress.Commands.add(
  'requestCognito',
  (method: string, endpoint: string, body: any, header: any, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) => {
    const log = Cypress.log({
      displayName: 'requestWithBodyAndHeader',
      message: [`Request for post/path/put/delete with header`],
      // @ts-ignore
      autoEnd: false,
    });

    log.snapshot('before');

    cy.request({
      method,
      url: `${endpoint}`,
      headers: {
        header,
      },
      body,
      failOnStatusCode,
      timeout,
      log: true,
    });

    log.snapshot('after');
    log.end();
  },
);

Cypress.Commands.add('requestWithoutBody', (method: string, endpoint: string, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) => {
  const log = Cypress.log({
    displayName: 'requestWithoutBody',
    message: [`Request for post/path/put/delete with header`],
    // @ts-ignore
    autoEnd: false,
  });

  cy.log('requestWithoutBody', {
    methodHttp: method,
    route: `${endpoint}`,
  });

  log.snapshot('before');

  cy.request({
    method,

    url: `${endpoint}`,
    failOnStatusCode,
    timeout,
    log: true,
  });

  log.snapshot('after');
  log.end();
});

Cypress.Commands.add(
  'requestWithoutBodyButParam',
  (method: string, endpoint: string, param: string, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) => {
    const log = Cypress.log({
      displayName: 'requestWithoutBody',
      message: [`Request for post/path/put/delete with header`],
      // @ts-ignore
      autoEnd: false,
    });

    log.snapshot('before');
    cy.request({
      method,
      url: `${endpoint}/${param}`,

      failOnStatusCode,
      timeout,
      log: true,
    });
    log.snapshot('after');
    log.end();
  },
);

Cypress.Commands.add(
  'requestWithBodyAndParamAndHeader',
  (method: string, endpoint: string, body: string, param: string, header: object, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) =>
    cy.request({
      method,
      url: `${endpoint}/${param}`,
      headers: {
        header,
      },
      body,
      failOnStatusCode,
      timeout,
      log: true,
    }),
);

// const dataRegex = /[0-9]{2}[-|\\/]{1}[0-12]{2}[-|\\/]{1}[0-9]{4}/;
// const invoiceEndRegex = /0{5}/;
// if (txtEdit.match(dataRegex)) {
//   return txtEdit.replace(dataRegex, dataIncrement(10)).replace(invoiceEndRegex, faker.random.numeric(5));
// }
// Mudar a primeira coluna do upload de notas (REGEX tamanho do char)

Cypress.Commands.add(
  'requestFormData',
  (method: string, endpoint: string, filePath: string, typeFile: string, encondingType: string, formObject = {}, failOnStatusCode = false) => {
    if (encondingType === 'text/csv') {
      cy.createInvoiceCsv();
    }

    cy.readFile(filePath, 'binary')
      .then((txtEdit) => txtEdit)
      .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin, encondingType))
      .then((blob) => {
        const log = Cypress.log({
          displayName: 'requestFormData',
          message: [`Request for post`],
          // @ts-ignore
          autoEnd: false,
        });
        log.snapshot('before');
        const formData = new FormData();
        if (formObject.key) {
          formData.append(formObject.key, formObject.value);
        }
        formData.append(typeFile, blob);

        cy.log('RequestFormData', {
          methodHttp: method,
          route: `${endpoint}`,
          paht: filePath,
          type: typeFile,
          enconding: encondingType,
          object: formObject,
        });

        cy.request({
          method,
          url: `${endpoint}`,

          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          failOnStatusCode,
          log: true,
        });
        log.snapshot('after');
        log.end();
        // formRequest(url, formData, function (response) {
        //   console.log(response);
        //   expect(response.status).to.eq(201);
        // });
      });
  },
);

// function formRequest(url, formData, done) {
//   const xhr = new XMLHttpRequest();

//   xhr.withCredentials = true;
//   if (typeof XMLHttpRequest !== 'undefined') {
//     xhr.open('POST', url);

//     xhr.setRequestHeader('Authorization', `Bearer ${Cypress.env('TOKEN_BAREAR')}`);
//     // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
//     // xhr.setRequestHeader('Content-Type', 'application/json');
//     console.log('XMLHttpRequest created.');
//   }

//   xhr.onload = function () {
//     done(xhr);
//   };
//   xhr.onerror = function () {
//     done(xhr);
//   };
//   xhr.send(formData);
// }
