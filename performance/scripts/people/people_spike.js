import http from 'k6/http';
import { check, sleep, group } from 'k6';

import { lk } from '../helper/helper.js';

export const options = {
  stages: [
    { duration: '2s', target: 2 }, // below normal load
    { duration: '20s', target: 2 },
    { duration: '2s', target: 14 }, // spike to 14 users
    { duration: '40s', target: 14 }, // stay at 14 for 3 minutes
    { duration: '2s', target: 2 }, // scale down. Recovery stage.
    { duration: '40s', target: 2 },
    { duration: '2s', target: 0 },
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
