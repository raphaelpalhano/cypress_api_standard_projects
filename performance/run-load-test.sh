docker-compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
MSYS_NO_PATHCONV=1 docker-compose run --rm k6 run /performance/scripts/swap.test.js
