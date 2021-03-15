import article from '../model/Article.js'
import path from 'path'
import moment from 'dayjs'
import mkdir from 'make-dir'

import fs from 'fs'

import {
  v4 as uuidv4
} from 'uuid'

class ArticleController {
  // 文章列表
  async getArticleList(ctx) {
    console.log(ctx.query)
    const {
      tag,
      category,
      search,
      page,
      limit,
      status
    } = ctx.query
    const query = {}
    if (status == 1) {
      query.status = 1
    }
    if (tag) {
      query.tag = tag
    }
    if (category) {
      query.category = category
    }
    let regexp
    if (search) {
      regexp = new RegExp(search, 'i')
      query.$or = [{
        title: {
          $regex: regexp
        }
      }, {
        content: {
          $regex: regexp
        }
      }]
    }



    const data = await article.aggregate([{
        $lookup: {
          from: 'categorys',
          localField: 'category',
          foreignField: 'name',
          as: 'category_associated'
        }
      },
      {
        $match: query
      },
      {
        $skip: (page - 1) * parseInt(limit)
      },
      {
        $limit: parseInt(limit)
      },

      {
        $sort: {
          created: -1
        }
      }
    ])
    const total = await article.find(query).count()

    ctx.body = {
      code: 200,
      data: data,
      total: total
    }
  }

  // 文章内容
  async getArticleInfo(ctx) {
    const {
      id
    } = ctx.query
    const result = await article.findOne({
      _id: id
    })
    // 更新文章阅读记数
    const updateReads = await article.updateOne({
      _id: id
    }, {
      $inc: {
        reads: 1
      }
    })

    // 将字符串切割相隔3个
    function splitChunks(string) {
      const regex = RegExp('.{1,' + Math.ceil(string.length / (string.length / 3)) + '}', 'g')
      return string.match(regex)
    }
    // 相关文章查询
    const query = {}
    const title = result.title
    const str = splitChunks(title)
    const strArr = []
    for (let i = 0; i < str.length; i++) {
      const title = {
        title: {
          $regex: new RegExp(str[i], 'i')
        }
      }
      strArr.push(title)
    }
    query.$or = strArr
    const relatedResult = await article.find(query).limit(6)
    const related = relatedResult.filter(item => item.id != id)

    ctx.body = {
      code: 200,
      data: result,
      related: related
    }
  }

  // 热门文章
  async hotArticle(ctx) {
    const result = await article.find({
      status: 1
    }).sort({
      reads: -1
    }).limit(10)

    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 获取文章归档数据
  async getArchive(ctx) {
    // 获取总条数
    const total = await article.find().count()
    // 获取归档数据
    const data = await article.aggregate([{
        $project: {
          title: '$title',
          reads: '$reads',
          createdTime: {
            $substr: [{
              $add: ['$created', 28800000]
            }, 0, 10]
          },
          created: {
            $substr: [{
              $add: ['$created', 28800000]
            }, 0, 4]
          }
        }
      },
      {
        $group: {
          _id: '$created',
          yearList: {
            $push: {
              id: '$_id',
              title: '$title',
              reads: '$reads',
              created: '$createdTime'
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          _id: -1 // 执行完 $group，得到的结果集按照_id排列
        }
      }
    ])

    ctx.body = {
      code: 200,
      data: data,
      total
    }
  }

  // 上传图片
  async uploadImg(ctx) {
    // 定义上传路径
    const uploadPath = process.env.NODE_ENV === 'production' ? 'public' : path.join(path.resolve(__dirname), '../public')
    // 回去上传信息
    const file = ctx.request.files.file
    // 上传图片大于2m 不能上传
    if (file.size > 2048000) {
      ctx.body = {
        code: 200,
        msg: '图片不能大于2M'
      }
      return
    }
    // 图片格式
    const ext = file.name.split('.').pop()
    // 创建存储目录路径
    const dir = `${uploadPath}/${moment().format('YYYYMMDD')}`
    // 判断路径是否存在，不存在则创建
    await mkdir(dir)
    // 存储文件到指定的路径
    // 使用uuid做为唯一的名称
    const picname = uuidv4()
    const destPath = `${dir}/${picname}.${ext}`
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(destPath)
    const filePath = `/${moment().format('YYYYMMDD')}/${picname}.${ext}`
    reader.pipe(upStream)

    ctx.body = {
      code: 200,
      msg: '图片上传成功',
      data: filePath
    }
  }

  // 文章增加
  async addArticle(ctx) {
    const {
      body
    } = ctx.request


    const result = await article(body).save()
    ctx.body = {
      code: 200,
      data: result,
      msg: '添加成功'
    }
  }

  // 文章修改
  async updateArticle(ctx) {
    const {
      _id,
      tag,
      title,
      content,
      description,
      category,
      status,
      img
    } = ctx.request.body
    const result = await article.updateOne({
      _id
    }, {
      $set: {
        tag,
        title,
        content,
        description,
        category,
        status,
        img
      }
    })
    if (result.ok == 1) {
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

  // 文章删除
  async deleteArticle(ctx) {
    const {
      _id
    } = ctx.request.body
    const result = await article.deleteOne({
      _id
    })

    if (result.ok == 1) {
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
}

export default new ArticleController()