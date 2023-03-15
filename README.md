
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


```json
{
    "$schema": "https://on.cypress.io/cypress.schema.json",
    "baseUrl": "https://gw-if004-ms8-master.nonprod.mysuppliers.com.br/proxy",
    "env": {
        "sapUrl": "https://gw-if004-ms8-master.nonprod.mysuppliers.com.br/api/v1/",
        "global_timeout": 50000,
        "environment": "nonprod",
        "USERS": {
            "USER_BACK_INVESTOR": "investidor_back_test@mailinator.com",
            "USER_BACK_SUPPLIER": "fornecedor_back_test@mailinator.com",
            "USER_BACK_MANAGER": "gestor_back_test@mailinator.com",
            "USER_INTEGRATOR": "integracao.api@mailinator.com",
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
