import { test, expect, request } from '@playwright/test';

test('POST /login - successful login', async () => {
  const apiRequest = await request.newContext();
  const response = await apiRequest.post('http://localhost:3000/login', {
    data: {
      username: 'tester01',
      password: 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c' // Ersätt med dina credentials
    }
  });
  expect(response.status()).toBe(200);
  
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('token');  // <--- Här hämtas token från login-svaret
});


test('GET /rooms - fetch all rooms', async () => {
    const apiRequest = await request.newContext();
    
    // Logga in först för att få token
    const loginResponse = await apiRequest.post('http://localhost:3000/login', {
      data: { username: 'tester01', password: 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c' }
    });
    const { token } = await loginResponse.json();  // <--- Här hämtas token från login-responsen
  
    // Använd token för att hämta rum
    const response = await apiRequest.get('http://localhost:3000/rooms', {
      headers: {
        Authorization: `Bearer ${token}`  // <--- Här används token i headers för autentisering
      }
    });
    
    expect(response.status()).toBe(200);
    
    const rooms = await response.json();
    expect(Array.isArray(rooms)).toBe(true);
  });
  

