import Router from 'koa-router';
import { Context } from 'koa';

const router = new Router({ prefix: '/api/appointments' });

// 暫存資料（之後可換成 DB）
const appointments: any[] = [];

/** GET /api/appointments 取得全部預約 */
router.get('/', async (ctx: Context) => {
  ctx.body = appointments;
});

/** POST /api/appointments 建立新預約 */
router.post('/', async (ctx: Context) => {
  const data = ctx.request.body;

  // 基本驗證
  if (!data?.name_en || !data?.email) {
    ctx.status = 400;
    ctx.body = { error: 'name_en 與 email 為必填' };
    return;
  }

  appointments.push(data);
  ctx.status = 201;
  ctx.body = { message: 'Appointment created', data };
});

export default router;
