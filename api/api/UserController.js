import user from '../model/User'
import jwt from 'jsonwebtoken'

class UserController {
  // 用户登录
  async login(ctx) {
    const {
      username,
      password
    } = ctx.request.body
    const userData = await user.findOne({
      username,
      password
    })
    if (userData === null) {
      ctx.body = {
        code: 404,
        msg: '用户名或者密码错误'
      }
      return
    }
    const token = jwt.sign({
      _id: userData._id
    }, '33pG2mD51xMo%OUOTo$ZWOa3TYt328tcjXtW9&hn%AOb9q', {
      expiresIn: '1d'
    })


    ctx.body = {
      code: 200,
      user: userData,
      token: token,
      msg: '登录成功'
    }
  }


}

export default new UserController
