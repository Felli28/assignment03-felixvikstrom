import { test, expect } from '@playwright/test';

test('Test login - backend', async ({ request }) => {
  const response = await request.post('http://localhost:3000/api/login', {
    headers: { 'Content-Type': 'application/json' },
    data: { username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD }
  });
  expect(response.ok()).toBeTruthy();
  const { token } = await response.json();
  expect(token).toBeTruthy();
  console.log('Token:', token);
});

test('Test get rooms - backend', async ({ request }) => {
  const loginResponse = await request.post('http://localhost:3000/api/login', {
    headers: { 'Content-Type': 'application/json' },
    data: { username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD }
  });

  expect(loginResponse.ok()).toBeTruthy();
  const { token } = await loginResponse.json();

  const roomsResponse = await request.get('http://localhost:3000/api/rooms', {
    headers: {
      'Content-Type': 'application/json',
      'x-user-auth': JSON.stringify({
        username: process.env.TEST_USERNAME,
        token: token
      })
    }
  });

  expect(roomsResponse.ok()).toBeTruthy();
  expect(roomsResponse.status()).toBe(200);

  const rooms = await roomsResponse.json();
  console.log('Rum:', rooms);
});






