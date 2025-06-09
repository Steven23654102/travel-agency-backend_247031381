import Koa, { Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import tourRouter from './controllers/tourController';
import * as koaSwagger from 'koa2-swagger-ui';
import YAML from 'yamljs';
import path from 'path';

dotenv.config();

const app = new Koa();
const router = new Router();

router.get('/', async (ctx: Context) => {
  ctx.body = 'API is running';
});

// 載入 Swagger 規格
const swaggerSpec = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));

// 加入 Swagger UI 中介軟體
app.use(
  koaSwagger.koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: { spec: swaggerSpec },
  })
);


app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(tourRouter.routes()).use(tourRouter.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
