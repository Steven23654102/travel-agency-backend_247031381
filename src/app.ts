// app.ts
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import tourRouter from './controllers/tourController';
import appointmentRouter from './controllers/appointmentsController';   
import * as koaSwagger from 'koa2-swagger-ui';
import YAML from 'yamljs';
import path from 'path';
import hotelRouter from './controllers/hotelController';

dotenv.config();

const app = new Koa();
const router = new Router();

router.get('/', async (ctx: Context) => {
  ctx.body = 'API is running';
});

// Swagger
const swaggerSpec = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));
app.use(
  koaSwagger.koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: { spec: swaggerSpec },
  })
);

// Middlewares
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(tourRouter.routes()).use(tourRouter.allowedMethods());
app.use(appointmentRouter.routes()).use(appointmentRouter.allowedMethods());
app.use(hotelRouter.routes()).use(hotelRouter.allowedMethods());
// 匯出 app 給測試使用
export default app;
