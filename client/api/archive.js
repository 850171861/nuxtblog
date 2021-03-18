import axios from '@/utils/request.js'

// 获归档数据
const getArchive = () => axios.get('/getArchive')

export {
  getArchive
}
