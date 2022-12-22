
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
    Demonstrates how to run load tests with containerised instances of K6, Grafana and InfluxDB.
### Article
    https://medium.com/swlh/beautiful-load-testing-with-k6-and-docker-compose-4454edb3a2e3

### Dashboards
    The dashboard in /dashboards is adapted from the excellent K6 / Grafana dashboard here:
    https://grafana.com/grafana/dashboards/2587

    There are only two small modifications:
    * the data source is configured to use the docker created InfluxDB data source
    * the time period is set to now-15m, which I feel is a better view for most tests

### Scripts
    The script here is an example of a low Virtual User (VU) load test of the excellent Star Wars API:
    https://swapi.dev/

    Run it
    ```
    docker-compose up -d influxdb grafana
    docker-compose run k6 run /scripts/ewoks.js
    ```