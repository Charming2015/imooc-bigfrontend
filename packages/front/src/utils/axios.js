import axios from 'axios';
import errorHandle from './errorHandle';
// TODO: 重新封装axios
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      timeout: 1000000,
    };
    return config;
  }

  interceptors(instance) {
    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        errorHandle(err);
        return Promise.reject(err);
      }
    );

    // 响应拦截器
    instance.interceptors.response.use(
      res => {
        console.log(res.status);
        if (res.status === 200) {
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res);
        }
      },
      err => {
        console.log('err', err);
        errorHandle(err);
        return Promise.reject(err);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    const newOptions = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(newOptions);
  }

  get(url, config) {
    const options = Object.assign(
      {
        method: 'get',
        url: url,
      },
      config
    );
    return this.request(options);
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data,
    });
  }
}
export default HttpRequest;
