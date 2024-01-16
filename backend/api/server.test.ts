import { test, expect } from 'vitest';
import request from 'supertest';
import { app } from "./server";

test('GET /', async () => {
	const response = await request(app).get('/');
	expect(response.statusCode).toBe(200);
})