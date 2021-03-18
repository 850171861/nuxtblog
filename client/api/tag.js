import axios from '@/utils/request.js'

// 获标签列表
const tagList = (data) => axios.get('/taglist', data)

export {
  tagList
}
