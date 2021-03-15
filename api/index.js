import Koa from 'koa'
import router from './routes'
import koaBody from 'koa-body'
import JWT from 'koa-jwt'
import statics from 'koa-static'
import path from 'path'

import cors from '@koa/cors'
import log4js from './config/log4.js'
import errorHandle from './config/errorHandle'


const app = new Koa()

// 允许跨域
app.use(cors())
app.use(statics(path.join(__dirname + '/public'))),

  // post和图片上次
  app.use(koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 5 * 1024 * 1024
    },
    onError: err => {
      console.log('koabody TCL: err', err)
    }
  }))
// 不需要验证接口,如前端的所有的路由 /api，后端的/longi
const jwt = JWT({
  secret: '33pG2mD51xMo%OUOTo$ZWOa3TYt328tcjXtW9&hn%AOb9q'
}).unless({
  path: [/^\/images/, /^\/public/, /^\/article/, /^\/warehouse/, /^\/category/, /^\/api/, /^\/login/]
})

// 身份认证
app.use(jwt)
// 日志
app.use(log4js.koaLogger(log4js.getLogger('access'), {
  level: 'auto'
}))

// 处理请求错误
app.use(errorHandle)
// 路由挂载
app.use(router())

app.listen(3001)