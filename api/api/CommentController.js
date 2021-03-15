import comment from '../model/comment'
import article from '../model/Article'
import {
  v4 as uuidv4
} from 'uuid'

class CommentsController {
  // 获取评论
  async getComment (ctx) {
    const {
      id,
      page,
      limit
    } = ctx.query
    let query
    if (id) {
      query = {
        tid: id
      }
    } else {
      query = {}
    }
    const result = await comment.find(query).skip((page - 1) * parseInt(limit)).limit(parseInt(limit)).sort({
      created: -1
    })

    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 增加评论
  async addComment (ctx) {
    let result
    const {
      id,
      pic,
      tid,
      name,
      email,
      url,
      content,
      beReplyContent,
      beReplyName
    } = ctx.request.body
    // 有id代表发送过来的是二级评论，直接插入children数组
    if (id) {
      const childrenResult = await comment.updateOne({
        _id: id
      }, {
        $push: {
          childrenData: {
            $each: [{
              id: uuidv4(),
              pic: pic,
              name: name,
              email: email,
              url: url,
              content: content,
              beReplyContent: beReplyContent,
              beReplyName: beReplyName,
              created: new Date()
            }],
            $position: 0
          }
        }
      })

      if (childrenResult.ok === 1) {
        const articleAnswer = await article.updateOne({
          _id: tid
        }, {
          $inc: {
            answer: 1
          }
        })
      }
    } else {
      const data = await comment({
        tid: tid,
        pic: pic,
        name: name,
        content: content,
        email: email,
        url: url
      })

      result = await data.save()

      if (result) {
        const articleAnswer = await article.updateOne({
          _id: tid
        }, {
          $inc: {
            answer: 1
          }
        })
      }
    }

    ctx.body = {
      code: 200,
      message: '评论成功',
      data: result
    }
  }

  // 删除评论
  async deleteComment (ctx) {
    const {
      id,
      _id
    } = ctx.request.body
    let result
    if (_id) {
      result = await comment.deleteOne({
        _id: _id
      })
    } else {
      result = await comment.update({}, {
        $pull: {
          childrenData: {
            id: id
          }
        }
      }, {
        multi: true
      })
    }

    if (result.ok == 1) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '删除成功'
      }
    } else {
      ctx.body = {
        code: 500,
        data: result,
        msg: '删除失败'
      }
    }
  }
}

export default new CommentsController()

// for (let i = 0; i < 11; i++) {
//   const data = await comment({
//     children: [
//       {
//         id: 1,
//         pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         time: '2020-5-5',
//         content: '我是二级评论444444444444 //@中联设计：去央视好多年了。三星智力快车栏目吧，好像是。',
//         name: '我是一级评论'
//       },
//       {
//         id: 2
//       }
//     ],
//     tid: '5fffb4957484362910b39ef7',
//     pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     content: '我是一级评论',
//     name: '我是一级评论222222',
//     __v: 0
//   })
//   const result = await data.save()
// }
