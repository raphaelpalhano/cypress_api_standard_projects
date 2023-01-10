import { group } from 'k6';

import { getPeople, getAllPeople, getSpecies, getPlanets } from '../../../../scripts/people.service.js';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.02'], // http errors should be less than 5%
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 200ms
  },
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: '5s', target: 5 },

    // Stay at rest on 5 VUs for 10s
    { duration: '10s', target: 5 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: '5s', target: 0 },
  ],
};

export default function () {
  group('sponsors', function () {
    getPeople();
    getAllPeople();
  });

  group('summary', function () {
    getSpecies();
  });

  group('signatures', function () {
    getPlanets();
  });
}
