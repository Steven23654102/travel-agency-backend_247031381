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

router.put('/:id', async (ctx) => {
  const id = Number(ctx.params.id);
  const updatedHotel = ctx.request.body as { name: string };
  ctx.body = { id, ...updatedHotel };
});

router.delete('/:id', async (ctx) => {
  const id = Number(ctx.params.id);
  ctx.status = 204;
});

export default router;
