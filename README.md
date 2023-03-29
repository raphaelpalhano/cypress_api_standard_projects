
# Configuração inicial

## 1. VSC
  **Plugins**
  * EditorConfig for VS Code
  * ESLint
  * Draw.io Integration
  

## 2. instalações
 * npm i 
 * npm i --production

## 3. Verificação do ambiente
  * Criar um arquivo ou mudar a url do cypress.config.js

**Configurando multiplos ambientes:**

1. Vá até o arquivo cypress.config.js

Verifique os envs e users.


# Ambientes

PREVISÃO:

prod: https://gw-if004-ms8-master.mysuppliers.com.br/
nonprod: https://gw-if004-ms8-master.nonprod.mysuppliers.com.br/
develop: https://gw-if004-ms8-develop.nonprod.mysuppliers.com.br/



# Dashboard


## Cypress Cloud


### Acesso

`username`: qaapidash@mailinator.com

`senha`: qaMs8Automacao55422@

[url](https://cloud.cypress.io/projects/6uxwi3/runs)


## Ci config

gitlab.cy

```yaml

stages:
  - test
# For recording and parallelization to work you must set your CYPRESS_RECORD_KEY
# in GitLab repo → Settings → CI/CD → Variables
variables:
    CYPRESS_RECORD_KEY: '077d3cc1-0295-4f01-9993-5cef3af25bef',

# Caches dependencies using npm lock file as key
# https://docs.cypress.io/guides/continuous-integration/introduction#Caching
cache:
  key:
    files:
      - package-lock.json
  paths:
    - .npm/ # Moves npm cache inside project per GitLab restrictions
test:
  # Uses official Cypress docker image for dependencies
  # https://docs.cypress.io/guides/continuous-integration/introduction#Official-Cypress-Docker-Images
  image: cypress/browsers:node12.14.1-chrome85-ff81
  stage: test
  parallel: 2 # Uses 2 parallel instances
  script:
    - npm ci --cache .npm --prefer-offline
    # Starts web server for E2E tests - replace with your own server invocation
    # https://docs.cypress.io/guides/continuous-integration/introduction#Boot-your-server
    - npm start &
    - npx wait-on 'http-get://localhost:3000' # Waits for above
    # Runs tests in parallel and records to Cypress Cloud
    # https://docs.cypress.io/guides/cloud/projects#Set-up-a-project-to-record
    # https://docs.cypress.io/guides/guides/parallelization
    - npx cypress run --record --parallel --browser chrome

```
