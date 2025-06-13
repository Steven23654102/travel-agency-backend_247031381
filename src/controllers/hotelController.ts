// src/controllers/hotelController.ts
import Router from 'koa-router';

const router = new Router({ prefix: '/api/v1/hotels' });

router.get('/', async (ctx) => {
  ctx.body = [
    { id: 1, name: 'Hotel A' },
    { id: 2, name: 'Hotel B' }
  ];
});

export default router;
