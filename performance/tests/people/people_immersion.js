import { group } from 'k6';

import { getPeople, getAllPeople, getSpecies, getPlanets } from '../../scripts/people.service.js';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.05'], // http errors should be less than 1%
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 200ms
  },

  stages: [
    { duration: '5s', target: 40 }, // beyond the breaking point
    { duration: '50s', target: 50 },
    { duration: '5s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  group('people', function () {
    getPeople();
    getAllPeople();
  });

  group('species', function () {
    getSpecies();
  });

  group('planets', function () {
    getPlanets();
  });
}
