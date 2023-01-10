/**
 * EN: The command cy.contractValidation() should be used for contract validation.
 *   It is necessary to install the AJV to work (https://github.com/epoberezkin/ajv#installation)
 *   The for loop is responsible for creating the list of errors of the contract
 * validation that is displayed alongside the error message.
 *   To generate the schemas I usually use the tool JSON-SCHEMA: https://www.jsonschema.net/home.
 *
 * PT-BR: O comando cy.contractValidation() deve ser utilizado para validações de contrato.
 *   É necessário a instalação do AJV para que o comando funcione: https://github.com/epoberezkin/ajv#installation
 *   O laço for é o responsável por criar a lista com os erros
 * da validação do contrato que é mostrado junto a mensagem de erro.
 *   Para gerar os schemas das respostas eu costumo utilizar
 * a ferramenta JSON-SCHEMA: https://www.jsonschema.net/home nela é possivel
 * escolher exatamente quais campos você quer trazer para seu schema.
 *
 */
import Ajv from 'ajv';
import { createSchema } from 'genson-js';

const ajv = new Ajv({ allErrors: true, verbose: true, strict: false });

const schemaGenerator = (file: string, response: object) => {
  cy.task('readFileMaybe', `cypress/fixtures/schema/${file}`).then((valid) => {
    const schemaString = createSchema(response);
    if (!valid) {
      cy.log('archive not found, I am creating the file...');
      cy.writeFile(`cypress/fixtures/schema/${file}`, schemaString);
    } else {
      cy.log('The file exist!');
    }
  });
};

Cypress.Commands.add('schemaValidation', (filePath, res: any) => {
  schemaGenerator(filePath, res);

  cy.fixture(`schema/${filePath}`).then((schema) => {
    const validate = ajv.compile(schema);
    const valid = validate(res);
    if (!valid) {
      let errors = '';
      for (const each in validate.errors) {
        const err = validate.errors[each];
        errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`;
      }

      throw new Error(`Contract validation erros, please verify!${errors}`);
    }
    return 'Schema validated successfully!';
  });
});
