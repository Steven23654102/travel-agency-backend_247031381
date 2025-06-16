import Router from 'koa-router';
import { Context } from 'koa';

const router = new Router({ prefix: '/api/appointments' });

/* -------- 假資料庫 (記憶體陣列) -------- */
interface Appointment {
  id: number;
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
const appointments: Appointment[] = [];

/* -------- READ ALL -------- */
router.get('/', (ctx: Context) => {
  ctx.status = 200;
  ctx.body   = appointments;
});

/* -------- READ ONE -------- */
router.get('/:id', (ctx: Context) => {
  const id   = Number(ctx.params.id);
  const item = appointments.find(a => a.id === id);

  if (!item) {
    ctx.status = 404;
    ctx.body   = { error: 'Appointment not found' };
    return;
  }
  ctx.status = 200;
  ctx.body   = item;
});

/* -------- CREATE -------- */
router.post('/', (ctx: Context) => {
  const data = ctx.request.body as Omit<Appointment, 'id'>;

  if (!data?.name_en || !data?.email) {
    ctx.status = 422;
    ctx.body   = { error: 'name_en 與 email 為必填' };
    return;
  }

  const newAppointment: Appointment = {
    id: appointments.length + 1,
    ...data,
  };
  appointments.push(newAppointment);

  ctx.status = 201;
  ctx.body   = newAppointment;
});

/* -------- UPDATE -------- */
router.put('/:id', (ctx: Context) => {
  const id  = Number(ctx.params.id);
  const idx = appointments.findIndex(a => a.id === id);

  if (idx === -1) {
    ctx.status = 404;
    ctx.body   = { error: 'Appointment not found' };
    return;
  }

  const data = ctx.request.body as Partial<Appointment>;
  appointments[idx] = { ...appointments[idx], ...data };

  ctx.status = 200;
  ctx.body   = appointments[idx];
});

/* -------- DELETE -------- */
router.delete('/:id', (ctx: Context) => {
  const id  = Number(ctx.params.id);
  const idx = appointments.findIndex(a => a.id === id);

  if (idx === -1) {
    ctx.status = 404;
    ctx.body   = { error: 'Appointment not found' };
    return;
  }

  appointments.splice(idx, 1);
  ctx.status = 204;          // No Content
});

export default router;
