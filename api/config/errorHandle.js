import log4js from './log4'
import ErrorLog from '../model/ErrorLog'
import User from '../model/User'

const logger = log4js.getLogger('error')

export default async (ctx, next) => {
  try {
    await next()
    // 如果接口响应不是200，就进入catch
    if (ctx.status !== 200) {
      ctx.throw()
    }
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      ctx.status = err.status || 500
      ctx.body = Object.assign({
        code: 500,
        msg: err.message
      }, process.env.NODE_ENV === 'development'
        ? { stack: err.stack } : {})
    }

    // 保存错误日志文件到log文件中
    logger.error(`${ctx.url} ${ctx.method} ${ctx.status}
      ${err.stack}
      `)
    let user = ''
    if (ctx._id) {
      user = await User.findOne({ _id: ctx._id })
    }

    // 保存错误日志到数据库
    await ErrorLog.create({
      message: err.message,
      code: ctx.status,
      method: ctx.method,
      path: ctx.path,
      param: ctx.method === 'GET' ? ctx.query : ctx.request.body,
      username: user.username,
      stack: err.stack
    })
  }
}
