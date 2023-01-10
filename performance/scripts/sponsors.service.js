import http from 'k6/http';
import { check, sleep } from 'k6';

export function authSap() {
  const response = http.get(`https://8xbha0ib2d.execute-api.us-east-1.amazonaws.com/api/v1/auth/token`, { headers: { Accepts: 'application/json' } });
  check(response, { 'status is 200': (r) => r.status === 200 });

  sleep(0.3);
}
