export const options = {
  thresholds: {
    http_req_failed: ['rate<0.05'], // http errors should be less than 1%
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 200ms
  },
  systemTags: ['scenario', 'url', 'check', 'status', 'error', 'error_code'],
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
        { duration: '40s', target: 30 }, // stay at 40 for 50s
        { duration: '5s', target: 0 }, // scale down. (optional)
      ],
    },
    spike: {
      executor: 'ramping-vus',

      stages: [
        { duration: '2s', target: 2 }, // below normal load
        { duration: '20s', target: 2 },
        { duration: '2s', target: 14 }, // spike to 14 users
        { duration: '40s', target: 14 }, // stay at 14 for 3 minutes
        { duration: '2s', target: 2 }, // scale down. Recovery stage.
        { duration: '40s', target: 2 },
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
    endurance: {
      executor: 'ramping-vus',

      stages: [
        { duration: '5s', target: 40 }, // beyond the breaking point
        { duration: '50s', target: 50 },
        { duration: '5s', target: 0 }, // scale down. Recovery stage.
      ],
    },
  },
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
