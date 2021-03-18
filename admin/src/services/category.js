import {
  CATEGORY,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from '@/services/api'
import {
  request,
  METHOD
} from '@/utils/request'

// 获取分类数据
export async function category() {
  return request(CATEGORY, METHOD.GET)
}
// 删除分类数据
export async function deleteCategory(data) {
  return request(DELETE_CATEGORY, METHOD.POST, data)
}
// 新增分类数据
export async function addCategory(data) {
  return request(ADD_CATEGORY, METHOD.POST, data)
}
// 修改分类
export async function updateCategory(data) {
  return request(UPDATE_CATEGORY, METHOD.POST, data)
}
