import Koa, { Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const router = new Router();

//ctx 加上型別
router.get('/', async (ctx: Context) => {
  ctx.body = 'API is running';
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
