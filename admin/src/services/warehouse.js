import {
  WAREHOUSE_LIST,
  DELETE_WAREHOUSE,
  ADD_WAREHOUSE,
  UPDATE_WAREHOUSE
} from '@/services/api'
import {
  request,
  METHOD
} from '@/utils/request'

// 获取仓库数据
export async function warehouse () {
  return request(WAREHOUSE_LIST, METHOD.GET)
}
// 删除仓库数据
export async function deleteWarehouse (data) {
  return request(DELETE_WAREHOUSE, METHOD.POST, data)
}
// 新增仓库数据
export async function addWarehouse (data) {
  return request(ADD_WAREHOUSE, METHOD.POST, data)
}
// 修改仓库数据
export async function updateWarehouse (data) {
  return request(UPDATE_WAREHOUSE, METHOD.POST, data)
}
