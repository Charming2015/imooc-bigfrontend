import HttpRequest from './axios';
import config from '@/config';

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? config.baseUrl.dev : config.baseUrl.pro;

const axios = new HttpRequest(baseUrl);

export default axios;
