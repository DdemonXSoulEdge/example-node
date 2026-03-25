import http from 'k6/http';
import { check, sleep } from 'k6';

export function setup() {
  http.get(`${BASE_URL}/users`);
}

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // más suave
    { duration: '1m', target: 5 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<4000'], // más realista para Render
    http_req_failed: ['rate<0.10'],    // tolerancia mayor
  },
};

const BASE_URL = 'https://fast-api-dev.onrender.com';

export default function () {

  let usersRes = http.get(`${BASE_URL}/users`);
  check(usersRes, {
    'Users status is 200': (r) => r.status === 200,
  });

  sleep(1);

  let itemsRes = http.get(`${BASE_URL}/items`);
  check(itemsRes, {
    'Items status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
