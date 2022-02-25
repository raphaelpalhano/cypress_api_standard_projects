import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: '5s', target: 40 }, // ramp up to  users
    { duration: '50s', target: 40 }, // stay at 40 for 50s 
    { duration: '5s', target: 0 }, // scale down. (optional)
  ],
};

export default function () {
  const response = http.get("https://swapi.dev/api/people/30/", { headers: { Accepts: "application/json" } });
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};
