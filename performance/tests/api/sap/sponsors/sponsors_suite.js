import { group } from 'k6';

import { getPeople, getAllPeople, getSpecies, getPlanets } from '../../../../scripts/people.service.js';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.05'], // http errors should be less than 1%
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 200ms
  },
  // systemTags: ['scenario', 'url', 'check', 'status', 'error', 'error_code'],
  scenarios: {
    load: {
      executor: 'ramping-vus',
      // exec: 'loadT',
      tags: { my_custom_tag: 'loadT' },
      stages: [
        // Ramp-up from 1 to 5 virtual users (VUs) in 5s
        { duration: '5s', target: 5 },

        // Stay at rest on 5 VUs for 10s
        { duration: '10s', target: 5 },

        // Ramp-down from 5 to 0 VUs for 5s
        { duration: '5s', target: 0 },
      ],
    },

    stress: {
      executor: 'ramping-vus',
      // exec: 'stressT',
      tags: { my_custom_tag: 'stress' },

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
    },
  },
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
