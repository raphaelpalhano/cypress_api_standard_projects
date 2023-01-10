
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




# docker-k6-grafana-influxdb


## Execução

### Subir o grafana

**Subir o grafana e influxdb:** `docker-compose up -d influxdb grafana`

### Executar os testes

**Executando arquivo específico com cli:** `docker-compose run --rm k6-cli run //performance//tests//api//swapi//swapi_suite.js`

**Executando vários arquivos:** `docker-compose up swapi_immersion swapi_stress --abort-on-container-exit --exit-code-from swapi_immersion swapi_stress`



## Estrutura de pastas do framework de performance

### Constants

Será reservado para exportar as constantes utilizadas no testes, como URL e outras, para não precisar repetir o valor.

### Dashboards

São os arquivos json, ou, arquivos yaml que estruturam os gráficos no grafana, como, linhas, dashboards, métricas, cor, tamanho, etc.


### docs

Documentos de anotações relacionados aos testes de performance

### helper

Arquivos com funções auxiliares, como: `conectar ao banco para executar querys`, `Criar reports automaticos`

### tests

Estrutura as pastas de serviços, endpoint que serão testadas.

[api](`somente testes que fazem request direto no microsserviço`) -->  [sap](`nome do microsserviço`) --> [sponsors](`nome do endpoint`) --> [group](`dentro de cada arquivo de teste será separado por grupo de métodos HTTP POST/sponsors, GET/sponsors`)

## Dash board

**URL**: `https://app.currents.dev/projects/T4Uq0n/runs`

## Entendendo como funciona o sorry-cypress

**URL**: `https://docs.sorry-cypress.dev/guide/get-started`

**Tutorial**: `https://www.youtube.com/watch?v=xyFe3QAK9IY&t=205s`