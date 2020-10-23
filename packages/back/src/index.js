/**
 * koa-router 「解析路由」
 * koa-body 「协议解析支持多格式数据上传」
 * @kao/cors 「跨域处理，前后端不同域，需要此插件才能让前端访问接口」
 * koa-combine-routers 「整合路由」
 * koa-helmet 「为程序提供安全头部」
 * koa-static 「静态资源服务，可惜不能映射到指定路由」
 * koa-json 「格式化返回的数据」
 * koa-compose 「整合多个中间件为一个中间件」
 * koa-compress
 * koa-jwt 「json-web-token 鉴权机制」
 */
import koa from 'koa';
import cors from '@koa/cors';
import koaJson from 'koa-json';
import koaCompose from 'koa-compose';
import koaStatics from 'koa-static';
import koaHelmet from 'koa-helmet';
import koaBody from 'koa-body';
import koaJwt from 'koa-jwt';
import router from '@/routes/index';
import errorHandle from '@/common/ErrorHandle';
import { PORT, PUBLIC_DIR, JWT } from './config';
const app = new koa();
// 定义公共路径，不需要jwt鉴权
const jwt = koaJwt({ secret: JWT.JWT_SECRET }).unless({
  path: [/^\/public/, /^\/login/],
});

// 集成中间件
const middleware = koaCompose([
  koaBody(),
  koaStatics(PUBLIC_DIR),
  cors(),
  koaJson({ pretty: false, param: 'pretty' }),
  koaHelmet(),
  errorHandle,
  jwt,
]);
app.use(middleware);
app.use(router());

app.listen(PORT, () => {
  console.log(`server is running at: http://localhost:${PORT}`);
});
