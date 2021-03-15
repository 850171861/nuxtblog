import category from '../model/category.js'
import moment from 'dayjs'

class CategoryController {
  // 查询文章分类
  async getCategoryList(ctx) {
    const {
      status
    } = ctx.query
    let match
    if (status == 1) {
      match = {
        $match: {
          'status': 1,
        }
      }
    } else {
      match = {
        $match: {}
      }
    }

    const data = await category.aggregate([{
        $lookup: {
          from: 'articles',
          localField: 'name',
          foreignField: 'category',
          as: 'articleCount'
        }
      },
      match,
      {
        $sort: {
          created: -1
        }
      }
    ])

    data.forEach(item => {
      item.articleCount = item.articleCount.length
      item.created = moment(item.created).format('YYYY-MM-DD HH:mm:ss')
    })

    ctx.body = {
      code: 200,
      data: data
    }
  }

  // 新增分类
  async addCategory(ctx) {
    const {
      body
    } = ctx.request
    const result = await category(body).save()
    let data = result.toObject()
    data.articleCount = 0;
    data.created = moment(data.created).format("YYYY-MM-DD HH:mm:ss"); //转换时间
    ctx.body = {
      code: 200,
      data: data,
      msg: '添加数据成功'
    }
  }

  // 修改分类
  async updateCategory(ctx) {
    const {
      _id,
      name,
      status
    } = ctx.request.body

    const data = await category.updateOne({
      _id
    }, {
      $set: {
        name,
        status
      }
    })

    if (data.nModified == 1 && data.ok == 1) {
      ctx.body = {
        code: 200,
        msg: '修改成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '修改失败'
      }
    }
  }

  // 删除分类
  async deleteCategory(ctx) {
    const {
      id
    } = ctx.request.body
    const result = await category.deleteOne({
      _id: id
    })
    if (result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: '删除成功'
      }
    }
  }
}

export default new CategoryController()
