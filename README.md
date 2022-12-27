
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

#### test suite

Você pode executar qualquer um dos scripts individuais como k6 run test01.js, e também pode executar todos eles via test-suite.js. Claro, test-suite.jspode ser muito mais dinâmico, com algumas variáveis ​​de ambiente e funções auxiliares, você pode construir pipelines de execução muito mais flexíveis e complexos, se necessário.

~~~js
import test01 from "./test01.js";
import test02 from "./test02.js";
import test03 from "./test03.js";

export let options = {
  execution: {
    "test1": {
      type: "composite",
      exec: "test01.default",
      options: test01.options,
    },
    "test2": {
      type: "composite",
      exec: "test01.default",
      options: test02.options,
      startAfter: "test1",
    },
    "test3": {
      type: "composite",
      exec: "test02.default",
      options: test02.options,
      startAfter: "test2",
    },
  }
}
~~~


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

  docker-compose run k6 run //scripts//es6sample.js
    Ou:

    MSYS_NO_PATHCONV=1 docker-compose run k6 run /scripts/es6sample.js
  
  Confirmado que funciona com o Git Bash 2.29.2 e o Docker 20.10.2 instalado por meio do Docker Desktop no Windows 10 Pro.
  É um problema causado pela conversão de caminho do MSYS2, que por algum motivo não era um problema quando WORKDIRera /, mas é quando você especifica caminhos absolutos como este.
  Você pode ver detalhes adicionais sobre isso nesta edição 29e maneiras de habilitar o env var globalmente.

    ```
    docker-compose up -d influxdb grafana
    docker-compose run k6 run //performance//scripts//
    ```
