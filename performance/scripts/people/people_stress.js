import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  stages: [
    { duration: '2s', target: 2 }, // below normal load
    { duration: '5s', target: 2 },
    { duration: '2s', target: 4 }, // normal load
    { duration: '5s', target: 4 },
    { duration: '2s', target: 6 }, // around the breaking point
    { duration: '5s', target: 6 },
    { duration: '2s', target: 8 }, // beyond the breaking point
    { duration: '5s', target: 8 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  group('Peoples', () => {
    const response = http.get(`https://swapi.dev/api/people/30`, { headers: { Accepts: 'application/json' } });
    check(response, { 'status is 200': (r) => r.status === 200 });
  });

  group('Species', () => {
    const response = http.get('https://swapi.dev/api/species/13/', { headers: { Accepts: 'application/json' } });
    check(response, { 'status is 200': (r) => r.status === 200 });
  });

  sleep(0.3);
}
