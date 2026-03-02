import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 10 },  // Ramp up
    { duration: '40s', target: 10 },  // Steady load
    { duration: '20s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% under 2s
    http_req_failed: ['rate<0.05'],    // <5% errors
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