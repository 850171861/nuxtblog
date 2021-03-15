import axios from '@/utils/request.js'

// 获取评论列表
const getcomment = (data) => axios.get('/getcomment', data)

// 添加评论
const addComment = (data) => axios.post('/addComment', data)
export {
  getcomment,
  addComment
}
