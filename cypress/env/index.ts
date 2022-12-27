/// <reference types="cypress" />

const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('.', 'cypress', 'env', `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = async (on, config) => {
  const file = config.env.configFile || config.env.homolog || config.env.prod;
  require('cypress-failed-log/on')(on);
  require('cypress-mochawesome-reporter/plugin')(on);
  on('task', {
    readFileMaybe(filename) {
      if (fs.existsSync(filename)) {
        return true;
      }

      return false;
    },
  });
  return getConfigurationByFile(file);
};
