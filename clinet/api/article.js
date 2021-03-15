import axios from '@/utils/request.js'

// 获取文章数据列表数据
const getArticleList = (data) => axios.get('/articlelist', data)

// 获取文章内容
const getArticleInfo = (data) => axios.get('/getArticleInfo', data)

// 获热门文章前10篇
const hotArticle = () => axios.get('/hotArticle')

export {
  getArticleList,
  hotArticle,
  getArticleInfo
}
