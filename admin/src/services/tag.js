import {
  TAG_LIST,
  DELETE_TAG,
  ADD_TAG,
  UPDATE_TAG
} from '@/services/api'
import {
  request,
  METHOD
} from '@/utils/request'

// 获取分类数据
export async function tag() {
  return request(TAG_LIST, METHOD.GET)
}
// 删除分类数据
export async function deleteTag(data) {
  return request(DELETE_TAG, METHOD.POST, data)
}
// 新增分类数据
export async function addTag(data) {
  return request(ADD_TAG, METHOD.POST, data)
}
// 修改分类
export async function updateTag(data) {
  return request(UPDATE_TAG, METHOD.POST, data)
}
