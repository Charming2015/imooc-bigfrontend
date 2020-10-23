import Router from 'koa-router';
import publicController from '../controller/public';
const router = new Router();

router.prefix('/public');
router.get('/getCaptcha', publicController.getCaptcha);
router.post('/gitWebHooks', async (ctx) => {
  console.log(ctx.request);
  console.log('=====================');
  console.log(ctx.request.body);
  console.log('=====================');
  ctx.body = {
    code: 200,
    msg: 'ok',
  };
});

export default router;
