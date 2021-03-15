import tag from '../model/Tag'
import article from '../model/Article'
import moment from 'dayjs'

class TagController {
  // 获标签列表
  async getTagList(ctx) {
    const {
      status
    } = ctx.query
    let match
    if (status == 1) {
      match = {
        $match: {
          status: 1
        }
      }
    } else {
      match = {
        $match: {}
      }
    }
    const data = await tag.aggregate([{
        $lookup: {
          from: 'articles',
          localField: 'name',
          foreignField: 'tag',
          as: 'articleCount'
        }
      },
      match,
      // {
      //   $unwind: "$articleCount"
      // },
      // {
      //   $match: {
      //     'articleCount.status': 1
      //   }
      // },
      // {
      //   $project: {
      //     _id: "$_id",
      //     name: "$name",
      //     created: "$created",
      //     count: {
      //       $add: 1
      //     }
      //   }
      // },
      // {
      //   $group: {
      //     _id: {
      //       _id: "$_id",
      //       name: "$name",
      //       created: "$created",
      //     },
      //     articleCount: {
      //       $sum: "$count"
      //     },

      //   }
      // },
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
      data: data,
      msg: '获取数据成功'
    }
  }

  // 新增标签
  async addTag(ctx) {
    const {
      body
    } = ctx.request
    const result = await tag(body).save()
    const data = result.toObject()
    data.articleCount = 0
    data.created = moment(data.created).format('YYYY-MM-DD HH:mm:ss') //转换时间
    ctx.body = {
      code: 200,
      data: data,
      msg: '添加数据成功'
    }
  }

  // 修改标签
  async updateTag(ctx) {
    const {
      _id,
      name,
      status
    } = ctx.request.body
    const data = await tag.updateOne({
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

  // 删除标签
  async deleteTag(ctx) {
    const {
      id
    } = ctx.request.body
    const result = await tag.deleteOne({
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

export default new TagController()
