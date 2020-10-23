import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkCode } from '@/utils/utils';
import sendMail from '@/utils/mail';
import { JWT } from '@/config';
import User from '@/db/mongoose/model/User';

// const commonCheckCode = async (ctx, cb) => {
//   const { body } = ctx.request;
//   const { sid, code } = body;
//   // 验证图片验证码的时效性，正确性
//   let validCode = await checkCode(sid, code);
//   if (validCode) {
//     return cb && cb();
//   } else {
//     ctx.body = {
//       code: 10001,
//       msg: '验证码错误',
//     };
//   }
// };

class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request;
    const sid = body.sid;
    const code = body.code;
    // 验证图片验证码的时效性、正确性
    let valid = await checkCode(sid, code);
    if (valid) {
      try {
        let result = await sendMail({
          code: 1234,
          expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          email: body.username,
          user: 'Brian',
        });
        ctx.body = {
          code: 200,
          data: result,
          msg: '邮件发送成功',
        };
      } catch (e) {
        console.log(e);
      }
    } else {
      ctx.body = {
        code: 10001,
        msg: '验证码错误',
      };
    }
  }
  async login(ctx) {
    // 接收用户的数据
    // 返回token
    const { body } = ctx.request;
    const { sid, code } = body;
    // 验证图片验证码的时效性，正确性
    let validCode = await checkCode(sid, code);
    if (validCode) {
      // 验证用户账号密码是否正确
      let user = await User.findOne({ username: body.username });
      if (await bcrypt.compare(body.password, user.password)) {
        // 验证通过，返回token数据
        const token = jsonwebtoken.sign({ _id: 'charming' }, JWT.JWT_SECRET, {
          expiresIn: '1d',
        });
        ctx.body = {
          code: 200,
          token,
        };
      } else {
        ctx.body = {
          code: 10002,
          msg: '用户名或密码错误',
        };
      }
    } else {
      ctx.body = {
        code: 10001,
        msg: '验证码错误',
      };
    }
  }

  async reg(ctx) {
    // 接收用户的数据
    // 返回token
    const { body } = ctx.request;
    const { sid, code } = body;
    // 验证图片验证码的时效性，正确性
    let validCode = await checkCode(sid, code);
    const msg = {};
    if (validCode) {
      // 查库，看username是否被注册
      // 查库，看name是否被注册
      // 写入数据到数据库
      // 验证用户账号密码是否正确
      let isDataValid = true;
      const isUserNameReg = await await User.findOne({
        username: body.username,
      });

      if (!!isUserNameReg) {
        msg.username = ['此邮箱已注册，可通过邮箱找回密码'];
        isDataValid = false;
      }
      const isNameReg = await await User.findOne({ name: body.name });
      if (!!isNameReg) {
        msg.name = ['该昵称已经被注册，请修改'];
        isDataValid = false;
      }
      if (isDataValid) {
        body.password = await bcrypt.hash(body.password, 5);
        const user = new User({
          username: body.username,
          name: body.name,
          password: body.password,
          // created: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
        let res = await user.save();
        ctx.body = {
          code: 200,
          data: res,
          msg: '注册成功',
        };
      }
    } else {
      msg.code = ['验证码错误'];
    }
    ctx.body = {
      code: 500,
      msg,
    };
  }
}

export default new LoginController();
