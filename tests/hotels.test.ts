import request from 'supertest';
import app from '../src/app';
import http from 'http';

const server = http.createServer(app.callback()); // 修正：建立 HTTP server

describe('Hotel API 測試', () => {
  it('GET /api/v1/hotels ➜ 應回傳 200', async () => {
    const res = await request(server).get('/api/v1/hotels');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
