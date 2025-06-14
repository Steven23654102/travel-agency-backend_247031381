import Router from 'koa-router';
import { Context } from 'koa';

const router = new Router({ prefix: '/api/appointments' });

// 暫存資料（之後可換成 DB）
const appointments: any[] = [];

/** GET /api/appointments 取得全部預約 */
router.get('/', async (ctx: Context) => {
  ctx.status = 200;                    // 明確回傳 200
  ctx.body = appointments;
});

interface Appointment {
  name_en: string;
  name_zh?: string;
  gender?: string;
  dob?: string;
  address?: string;
  hkid?: string;
  phone?: string;
  email: string;
  date?: string;
  time?: string;
  location?: string;
}

/** POST /api/appointments 建立新預約 */
router.post('/', async (ctx: Context) => {
  const data = ctx.request.body as Appointment;

  // 欄位驗證錯誤改 422
  if (!data?.name_en || !data?.email) {
    ctx.status = 422;                  // Unprocessable Entity
    ctx.body  = { error: 'name_en 與 email 為必填' };
    return;
  }

  // 自動補上 id
  const newAppointment = {
    id: appointments.length + 1,
    ...data,
  };

  appointments.push(newAppointment);

  ctx.status = 201;
  ctx.body   = { message: 'Appointment created', data: newAppointment };
});

export default router;
