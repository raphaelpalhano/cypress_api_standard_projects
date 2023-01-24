import http from 'k6/http';
import { check, sleep } from 'k6';

export function getPeople() {
  const response = http.get(`https://swapi.dev/api/people/30`, { headers: { Accepts: 'application/json' } });
  check(response, { 'status is 200': (r) => r.status === 200 });

  sleep(0.3);
}

export function getAllPeople() {
  const response = http.get(`https://swapi.dev/api/people`, { headers: { Accepts: 'application/json' } });
  check(response, { 'status is 200': (r) => r.status === 200 });

  sleep(0.3);
}

export function getPlanets() {
  const response = http.get(`https://swapi.dev/api/planets/34/`, { headers: { Accepts: 'application/json' } });
  check(response, { 'status is 200': (r) => r.status === 200 });

  sleep(0.2);
}

export function getSpecies() {
  const response = http.get(`https://swapi.dev/api/species/13/`, { headers: { Accepts: 'application/json' } });
  check(response, { 'status is 200': (r) => r.status === 200 });

  sleep(0.4);
}
