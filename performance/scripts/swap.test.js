import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  scenarios: {
    load: {
      executor: 'ramping-vus',

      stages: [
        // Ramp-up from 1 to 5 virtual users (VUs) in 5s
        { duration: '5s', target: 5 },

        // Stay at rest on 5 VUs for 10s
        { duration: '10s', target: 5 },

        // Ramp-down from 5 to 0 VUs for 5s
        { duration: '5s', target: 0 },
      ],
    },
    soak: {
      executor: 'ramping-vus',

      stages: [
        { duration: '5s', target: 40 }, // ramp up to  users
        { duration: '50s', target: 40 }, // stay at 40 for 50s
        { duration: '5s', target: 0 }, // scale down. (optional)
      ],
    },
    spike: {
      executor: 'ramping-vus',

      stages: [
        { duration: '2s', target: 2 }, // below normal load
        { duration: '1m', target: 2 },
        { duration: '2s', target: 14 }, // spike to 14 users
        { duration: '3m', target: 14 }, // stay at 14 for 3 minutes
        { duration: '2s', target: 2 }, // scale down. Recovery stage.
        { duration: '3m', target: 2 },
        { duration: '2s', target: 0 },
      ],
    },
    stress: {
      executor: 'ramping-vus',

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
  group('Peoples', () => {
    const response = http.get('https://swapi.dev/api/people/30', { headers: { Accepts: 'application/json' } });
    check(response, { 'status is 200': (r) => r.status === 200 });
    const response1 = http.get(`https://swapi.dev/api/people/40/`, { headers: { Accepts: 'application/json' } });
    check(response1, { 'status is 200': (r) => r.status === 200 });
  });

  group('Species', () => {
    const response = http.get('https://swapi.dev/api/species/13/', { headers: { Accepts: 'application/json' } });
    check(response, { 'status is 200': (r) => r.status === 200 });
  });

  sleep(0.3);
}
