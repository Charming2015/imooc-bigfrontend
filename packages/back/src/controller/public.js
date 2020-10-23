import svgCaptcha from 'svg-captcha';
import { setValue } from '@/db/redis';
class PublicController {
  constructor() {}

  async getCaptcha(ctx) {
    const { query } = ctx.request;
    const newCaptcha = svgCaptcha.create();
    console.log(query.sid, newCaptcha.text);
    // 保存图片验证码数据，设置超时时间，单位: s
    // 设置图片验证码超时10分钟
    setValue(query.sid, newCaptcha.text, 10 * 60);

    ctx.body = {
      code: 200,
      data: newCaptcha.data,
    };
  }
}

export default new PublicController();
