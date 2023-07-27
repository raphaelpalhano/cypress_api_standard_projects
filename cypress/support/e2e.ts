// This example support/index.js is processed and
// ***********************************************************
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import plugins
import 'cypress-failed-log';
import 'cypress-mochawesome-reporter/register';

// backend
import './commands/services/swap.service';
import './commands/services/rest.service';

// service-commom

// general
import './commands/helpers/router.control';
import './commands/helpers/string.control';
import './commands/helpers/file.control';
// import './commands/helpers/auth.service';
import './commands/helpers/request.service';
import './commands/helpers/schema.validation';
