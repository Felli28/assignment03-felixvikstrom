import { test, expect, request } from '@playwright/test';

test('Login and token', async ({ request }) => {
    const respone = await request.post('http://localhost:3000', {
        headers



 




