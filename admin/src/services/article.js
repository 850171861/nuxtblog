import {
  ARTICLE_LIST,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  UPLOAD_IMG
} from '@/services/api'
import {
  request,
  METHOD
} from '@/utils/request'

// 获取文章数据
export async function article(data) {
  return request(ARTICLE_LIST, METHOD.GET, data)
}
// 删除文章数据
export async function deleteArticle(data) {
  return request(DELETE_ARTICLE, METHOD.POST, data)
}
// 新增文章数据
export async function addArticle(data) {
  return request(ADD_ARTICLE, METHOD.POST, data)
}
// 修改文章数据
export async function updateArticle(data) {
  return request(UPDATE_ARTICLE, METHOD.POST, data)
}
// 图片上传
export async function uploadImg(data) {
  return request(UPLOAD_IMG, METHOD.POST, data)
}