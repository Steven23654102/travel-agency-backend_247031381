import Router from 'koa-router';
import { tours, Tour } from '../models/tour';

const router = new Router({ prefix: '/api/tours' });

router.get('/', ctx => {
  ctx.body = tours;
});

router.post('/', ctx => {
  const newTour: Tour = ctx.request.body as Tour;

  
  if (!newTour.id || !newTour.name || !newTour.price) {
    ctx.status = 400;
    ctx.body = { error: '請提供完整的 tour 資料 (id, name, price)' };
    return;
  }

  tours.push(newTour);
  ctx.status = 201;
  ctx.body = newTour;
});



export default router;
