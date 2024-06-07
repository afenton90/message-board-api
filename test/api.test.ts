import request from 'supertest';

import app from '../src/app';

describe('GET /api/v1/message', () => {
  it('responds with message id and success', async () => {
    const response = await request(app)
      .post('/api/v1/message')
      .send({ text: 'Hello, World!' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      id: expect.any(String),
    });
    expect(response.body.id.length).toBeGreaterThan(1);
  });
});
