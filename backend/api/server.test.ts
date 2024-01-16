import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from "./server";

describe('GET /', async () => {
	const response = await request(app).get('/');

	it('receives the correct HTTP code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('has the correct content-type', () => {
		expect(response.headers['content-type']).toMatch(/application\/json/);
	});

	it('contains the correct property', () => {
		const responseBody:string = JSON.parse(response.text);
		expect(responseBody).toHaveProperty('applicationName');

	})

})