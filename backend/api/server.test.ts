import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from "./server";

describe('GET /', async () => {
	const response = await request(app).get('/');
	const responseBody = JSON.parse(response.text);

	it('receives the correct HTTP code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('has the correct content-type', () => {
		expect(response.headers['content-type']).toMatch(/application\/json/);
	});

	it('contains the correct property', () => {
		expect(responseBody).toHaveProperty('applicationName');
	});

	it('applicationName has a value', () => {
		expect(responseBody.applicationName).not.toBe('');
	});
});

describe('GET /api/flaschards/info/logs', async () => {
	const response = await request(app).get('/api/flashcards/info/logs');

	it('receives the correct HTTP code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('has the correct content-type', () => {
		expect(response.headers['content-type']).toMatch(/text\/html/);
	});
});

describe('GET /api/flashcards', async () => {
	const response = await request(app).get('/api/flashcards');
	it('receives correct HTTP code', () => {
		expect(response.statusCode).toBe(200);
	});
	it('has correct content-type', () => {
		expect(response.headers['content-type']).toMatch(/application\/json/);
	});
});


