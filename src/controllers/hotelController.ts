// src/controllers/hotelController.ts
import Router from 'koa-router';

const router = new Router({ prefix: '/api/v1/hotels' });

router.get('/', async (ctx) => {
  ctx.body = [
    { id: 1, name: 'Hotel A' },
    { id: 2, name: 'Hotel B' },
  ];
});

// 加入 POST 處理
router.post('/', async (ctx) => {
  const newHotel = ctx.request.body;
  ctx.status = 201;
  ctx.body = newHotel;
});

export default router;
