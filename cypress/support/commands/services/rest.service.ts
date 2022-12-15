import { faker } from '@faker-js/faker';
import * as FormData from 'form-data';
import { dataIncrement } from '../helpers/string.control';

Cypress.Commands.add('requestWithBody', (method: string, endpoint: string, body: object, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) => {
  const log = Cypress.log({
    displayName: 'requestWithBody',
    message: [`Request for post/path/put/delete`],
    // @ts-ignore
    autoEnd: false,
  });

  log.snapshot('before');

  cy.request({
    method,
    url: `${Cypress.env('api')}${endpoint}`,
    body,
    failOnStatusCode,
    timeout,
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

    cy.request({
      method,
      url: `${Cypress.env('api')}${endpoint}`,
      headers: {
        header,
      },
      body,
      failOnStatusCode,
      timeout,
      log: false,
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

  log.snapshot('before');

  cy.request({
    method,

    url: `${Cypress.env('api')}${endpoint}`,
    failOnStatusCode,
    timeout,
    log: false,
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
      url: `${Cypress.env('api')}${endpoint}/${param}`,

      failOnStatusCode,
      timeout,
      log: false,
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
      url: `${Cypress.env('api')}${endpoint}/${param}`,
      headers: {
        header,
      },
      body,
      failOnStatusCode,
      timeout,
      log: false,
    }),
);

// Mudar a primeira coluna do upload de notas (REGEX tamanho do char)

Cypress.Commands.add(
  'requestFormData',
  (method: string, endpoint: string, filePath: string, typeFile: string, encondingType: string, formObject = {}, failOnStatusCode = false) => {
    cy.fixture(filePath, 'binary')
      .then((txtEdit) => {
        const dataRegex = /[0-9]{2}[-|\\/]{1}[0-12]{2}[-|\\/]{1}[0-9]{4}/;
        const invoiceEndRegex = /0{5}/;
        if (txtEdit.match(dataRegex)) {
          return txtEdit.replace(dataRegex, dataIncrement(10)).replace(invoiceEndRegex, faker.random.numeric(5));
        }
        return txtEdit;
      })
      .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin, encondingType))
      .then((blob) => {
        const log = Cypress.log({
          displayName: 'requestWithoutBody',
          message: [`Request for post/path/put/delete with header`],
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
          route: `${Cypress.env('api')}${endpoint}`,
          paht: filePath,
          type: typeFile,
          enconding: encondingType,
          object: formObject,
        });

        cy.request({
          method,
          url: `${Cypress.env('api')}${endpoint}`,

          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          failOnStatusCode,
          log: false,
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
