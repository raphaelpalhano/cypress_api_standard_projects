docker-compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
docker-compose up swapi_immersion swapi_stress --abort-on-container-exit --exit-code-from swapi_immersion swapi_stress
