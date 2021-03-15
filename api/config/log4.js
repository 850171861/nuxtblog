import log4js from 'koa-log4'

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'logs/access.log', // 生成文件路径和文件名
      pattern: '_yyyy-MM-dd.log' // 通过日期来生成文件
    },
    application: {
      type: 'dateFile',
      filename: 'logs/app.log', // 生成文件路径和文件名
      pattern: '_yyyy-MM-dd.log' // 通过日期来生成文件
    },
    error: {
      type: 'dateFile',
      filename: 'logs/error.log',
      pattern: '_yyyy-MM-dd.log'
    },
    out: { type: 'console' }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    application: { appenders: ['application'], level: 'WARN' },
    error: { appenders: ['error'], level: 'WARN' }
  }
})

export default log4js
