import request from 'supertest';

import app from '../src/app';

describe('GET /api/v1/message', () => {
  it('responds with an empty list of messages by default', async () => {
    const response = await request(app)
      .get('/api/v1/message')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('responds with a list of messages', async () => {
    await request(app)
      .post('/api/v1/message')
      .send({ text: 'Hello, World!' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    await request(app)
      .post('/api/v1/message')
      .send({ text: 'Another 2' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const response = await request(app)
      .get('/api/v1/message')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toContainEqual({
      id: expect.any(String),
      text: 'Hello, World!',
    });
    expect(response.body).toContainEqual({
      id: expect.any(String),
      text: 'Another 2',
    });
  });
});

describe('POST /api/v1/message', () => {
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
