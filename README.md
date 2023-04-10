
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

# Branch Standard

## Como usar?

`git checkout -b feature/{CHAVE-US-NOME-FUNCIONALIDADE-TIPO-DO-TESTE}`

**Exemplo**

`git checkout -b feature/MS8-FIDIS-1252-1250-approve-unapprove-termOfCerssion-apiTest`

# Env

**ambiente novo fidis**
```json


{
    "$schema": "https://on.cypress.io/cypress.schema.json",
    "baseUrl": "https://gw-if004-ms8-master.nonprod.mysuppliers.com.br",
    "env": {
        "sapUrl": "https://gw-if004-ms8-master.nonprod.mysuppliers.com.br/api/v1/",
        "global_timeout": 50000,
        "environment": "nonprod",
        "USERS": {
            "USER_BACK_INVESTOR": "investidor_back_test@mailinator.com",
            "USER_BACK_SUPPLIER": "fornecedor_back_test@mailinator.com",
            "USER_BACK_MANAGER": "gestor_back_test@mailinator.com",
            "USER_INTEGRATOR": "integracao.api@mailinator.com",
            "INVESTOR_API_USER": "investidor.api@mailinator.com",
            "INVESTOR_API_PASSWORD": "InvbackApi@2023",
            "MANAGER_VISUALIZER": "gestorvisualizador.nonprod@mailinator.com",
            "MANAGER_VISUALIZAR_PASS": "Test@123456",
            "MANAGER_EXECUTOR": "gestorexecutor.nonprod@mailinator.com",
            "MANAGER_EXECUTOR_PASS": "T@st123456",
            "MANAGER_SUPPORT": "gestorapoio.nonprod@mailinator.com",
            "MANAGER_SUPPORT_PASS": "Test@12345",
            "PASSOWRD_INTEGRATOR": "backApi@2023",
            
            "MANAGER_PASS": "backBack55221@",
            "INVESTOR_PASS": "backBack55221@",
            "SUPPLIER_PASS": "backBack55221@",
            "SAP_PASS": "backApi@2023",


            "INVALID_PASS": "123456@S",
            "OTP_PASS": "#eL9vLkL"
        },

        "AWS_AMPLYF": {
            "COGNITO_CLIENT_APP_ID": "26ubdj8n0vfnni0aujrq91pqo3",
            "COGNITO_USER_POOL_ID": "us-east-1_yHSI67nyL",
            "COGNITO_REGION": "us-east-1",
            "COGNITO_CLIENT_SAP": "6rvt8s8sjnh3tfsj5tfhrvhl65",
            "CLIENTE_SECRET_SAP": "1vn9t622hi74d2g218v45580j73pb7liqtddkpdjs9ccvnkm04n6"

        }
    }
}

```

**Ambiente antigo stellantis**

```json
{
    "$schema": "https://on.cypress.io/cypress.schema.json",
    "baseUrl": "https://m7ztiyopb8.execute-api.us-east-1.amazonaws.com/proxy",
    "env": {
        "sapUrl": "https://m7ztiyopb8.execute-api.us-east-1.amazonaws.com/api/v1/",
        "global_timeout": 50000,
        "environment": "nonprod",
        "USERS": {
            "USER_BACK_INVESTOR": "investidor_back_test@mailinator.com",
            "USER_BACK_SUPPLIER": "fornecedor_back_test@mailinator.com",
            "USER_BACK_MANAGER": "gestor_back_test@mailinator.com",
            "USER_INTEGRATOR": "integracao.api@mailinator.com",
            "PASSOWRD_INTEGRATOR": "backApi@2023",
            "INVESTOR_API_USER": "investidor.api@mailinator.com",
            "INVESTOR_API_PASSWORD": "InvbackApi@2023",
            "OTP_PASS": "#eL9vLkL",
            "MANAGER_PASS": "backBack55221@",
            "INVESTOR_PASS": "backBack55221@",
            "SUPPLIER_PASS": "backBack55221@",
            "SAP_PASS": "backApi@2023",


            "INVALID_PASS": "123456@S"
        },

        "AWS_AMPLYF": {
            "COGNITO_CLIENT_APP_ID": "o9od3jf3nqmfb0s8k8v3p1hcg",
            "COGNITO_USER_POOL_ID": "us-east-1_Enxdo9USw",
            "COGNITO_REGION": "us-east-1",
            "COGNITO_CLIENT_SAP": "454138p4irfg7gjd428af7pqkf",
            "CLIENTE_SECRET_SAP": "onmsvsv7nq70g51lpnnsab4mj270ajmu7ere1qcks988ttq610k"

        }
    }
}


```

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


# Cypress Docker

## Local Build

**command:** `docker build -t api-test-ms8:latest -f docker/dockerfile .`

## Local run

`docker run -t api-test-ms8:latest npx cypress run --env nonprod=nonprod`


## CI Build

**command:** `docker build -t gitlab.fcalatam.com:4567/fca/banco-fidis/ms8/api-test-ms8:latest -f docker/dockerfile .`
