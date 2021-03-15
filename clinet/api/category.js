import axios from '@/utils/request.js'

// 获分类列表
const categoryList = (data) => axios.get('/categorylist', data)

export {
  categoryList
}
