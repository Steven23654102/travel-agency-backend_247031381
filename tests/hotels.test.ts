// tests/hotels.test.ts
import request from 'supertest';
import app from '../src/app';
import http from 'http';

const server = http.createServer(app.callback());

describe('Hotel API 測試', () => {
  it('GET /api/v1/hotels ➜ 應回傳 200', async () => {
    const res = await request(server).get('/api/v1/hotels');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST 測試案例
  it('POST /api/v1/hotels ➜ 應回傳 201 與新增資料', async () => {
    const newHotel = { id: 3, name: 'Hotel C' };
    const res = await request(server)
      .post('/api/v1/hotels')
      .send(newHotel);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining(newHotel));
  });
});
