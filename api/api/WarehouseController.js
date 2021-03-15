import warehouse from '../model/warehouse'

class WarehouseController {
  // 获取仓库的数据列表
  async getWarehouse(ctx) {
    const result = await warehouse.find().sort({
      created: -1
    })


    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 添加仓库中的数据
  async addWarehouse(ctx) {
    const { body } = ctx.request
    const result = await warehouse(body).save()

    ctx.body = {
      code: 200,
      data: result,
      msg: '添加成功'
    }
  }

  // 修改仓库中的数据
  async updateWarehouse(ctx) {
    const { _id, url, content, title } = ctx.request.body
    const result = await warehouse.updateOne({ _id }, { $set: { url, content, title } })

    if (result.ok == 1) {
      ctx.body = {
        code: 200,
        msg: '修改成功'
      }
      return
    }
    ctx.body = {
      code: 500,
      msg: '修改失败'
    }
  }

  // 删除仓库中的数据
  async deleteWarehouse(ctx) {
    const { _id } = ctx.request.body
    const result = await warehouse.deleteOne({ _id })
    if (result.ok == 1) {
      ctx.body = {
        code: 200,
        msg: '删除成功'
      }
      return
    }
    ctx.body = {
      code: 500,
      msg: '删除失败'
    }
  }
}

export default new WarehouseController()
