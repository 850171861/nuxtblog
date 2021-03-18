import {
  ERROR_LOG,
  DELETE_ERRORLOG
} from '@/services/api'

import {
  request,
  METHOD
} from '@/utils/request'

// 获取错误日志数据
export async function errorLog () {
  return request(ERROR_LOG, METHOD.GET)
}
// 删除错误日志数据
export async function deleteErrorLog (data) {
  return request(DELETE_ERRORLOG, METHOD.POST, data)
}
