import combineRouters from 'koa-combine-routers';
import Router from 'koa-router';
import publicRouter from './public';
import loginRouter from './login';

export default combineRouters(loginRouter, publicRouter);
