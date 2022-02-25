import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: '2s', target: 2 }, // below normal load
    { duration: '1m', target: 2 },
    { duration: '2s', target: 14 }, // spike to 14 users
    { duration: '3m', target: 14 }, // stay at 14 for 3 minutes
    { duration: '2s', target: 2 }, // scale down. Recovery stage.
    { duration: '3m', target: 2 },
    { duration: '2s', target: 0 },
  ],
};

export default function () {
  const response = http.get("https://swapi.dev/api/people/30/", { headers: { Accepts: "application/json" } });
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};
