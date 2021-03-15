import ErrorLog from '../model/ErrorLog'

class ErrorLogController {
  // 获取日志错误
  async getErrorLog (ctx) {
    const { page, limit } = ctx.query
    const result = await ErrorLog.find().skip((page - 1) * parseInt(limit)).limit(parseInt(limit)).sort({
      created: -1
    })
    const total = await ErrorLog.find().count()
    ctx.body = {
      code: 200,
      data: result,
      total
    }
  }

  // 删除日志错误
  async deleteErrorLog (ctx) {
    const { _id } = ctx.request.body
    const result = await ErrorLog.deleteOne({ _id })

    if (result.ok == 1) {
      ctx.body = {
        code: 200,
        msg: '删除成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '删除失败'
      }
    }
  }
}

export default new ErrorLogController()
