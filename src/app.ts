import Koa, { Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';                 // ← 新增
import dotenv from 'dotenv';

import tourRouter from './controllers/tourController';
import appointmentRouter from './controllers/appointmentsController';
import hotelRouter from './controllers/hotelController';

import * as koaSwagger from 'koa2-swagger-ui';
import YAML from 'yamljs';
import path from 'path';

dotenv.config();

const app = new Koa();
const router = new Router();

/* ---------- CORS 全域允許 ---------- */
app.use(
  cors({
    origin: '*',                              // 開發階段全部允許；正式環境請改成你的網域
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);
/* ----------------------------------- */

router.get('/', async (ctx: Context) => {
  ctx.body = 'API is running';
});

/* ---------- Swagger ---------- */
const swaggerSpec = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));
app.use(
  koaSwagger.koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: { spec: swaggerSpec },
  })
);
/* ----------------------------- */

/* ---------- Middlewares / Routes ---------- */
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(tourRouter.routes()).use(tourRouter.allowedMethods());
app.use(appointmentRouter.routes()).use(appointmentRouter.allowedMethods());
app.use(hotelRouter.routes()).use(hotelRouter.allowedMethods());
/* ------------------------------------------ */

export default app;
