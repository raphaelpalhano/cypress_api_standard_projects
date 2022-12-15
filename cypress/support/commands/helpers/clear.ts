const rimraf = require('rimraf');

rimraf.sync('cypress/videos/*');
rimraf.sync('./reports/*');
