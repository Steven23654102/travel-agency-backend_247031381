// tests/appointments.test.ts
import request from 'supertest';
import app from '../src/app';
import http from 'http';

const server = http.createServer(app.callback());

describe('Appointment API 異常測試', () => {
  it('POST /api/appointments ➜ 缺欄位應回傳 422', async () => {
    const invalidData = { email: 'test@example.com' }; // 少了 name_en

    const res = await request(server)
      .post('/api/appointments')
      .send(invalidData);

    expect(res.status).toBe(422);
    expect(res.body).toHaveProperty('error');
  });
});
