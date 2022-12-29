import http from 'k6/http';
import { check, sleep, group } from 'k6';

import { lk } from '../../helper/helper.js';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  stages: [
    { duration: '5s', target: 40 }, // ramp up to  users
    { duration: '40s', target: 30 }, // stay at 40 for 50s
    { duration: '5s', target: 0 }, // scale down. (optional)
  ],
};

export default function () {
  group('Peoples', () => {
    const response = http.get(`${lk()}30`, { headers: { Accepts: 'application/json' } });
    check(response, { 'status is 200': (r) => r.status === 200 });
  });

  group('Species', () => {
    const response = http.get('https://swapi.dev/api/species/13/', { headers: { Accepts: 'application/json' } });
    check(response, { 'status is 200': (r) => r.status === 200 });
  });

  sleep(0.3);
}
