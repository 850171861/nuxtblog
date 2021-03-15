// 跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL

module.exports = {
  LOGIN: `${BASE_URL}/login/login`,
  // 分类管理
  CATEGORY: `${BASE_URL}/api/categoryList`,
  DELETE_CATEGORY: `${BASE_URL}/admin/deleteCategory`,
  ADD_CATEGORY: `${BASE_URL}/admin/addCategory`,
  UPDATE_CATEGORY: `${BASE_URL}/admin/updateCategory`,
  // 标签管理
  TAG_LIST: `${BASE_URL}/api/tagList`,
  DELETE_TAG: `${BASE_URL}/admin/deleteTag`,
  ADD_TAG: `${BASE_URL}/admin/addTag`,
  UPDATE_TAG: `${BASE_URL}/admin/updateTag`,
  // 评论管理
  COMMENT: `${BASE_URL}/api/getComment`,
  DELETE_COMMENT: `${BASE_URL}/admin/deleteComment`,
  // 仓库管理
  WAREHOUSE_LIST: `${BASE_URL}/api/getWarehouse`,
  DELETE_WAREHOUSE: `${BASE_URL}/admin/deleteWarehouse`,
  ADD_WAREHOUSE: `${BASE_URL}/admin/addWarehouse`,
  UPDATE_WAREHOUSE: `${BASE_URL}/admin/updateWarehouse`,
  // 文章管理
  ARTICLE_LIST: `${BASE_URL}/api/articlelist`,
  DELETE_ARTICLE: `${BASE_URL}/admin/deleteARTICLE`,
  ADD_ARTICLE: `${BASE_URL}/admin/addARTICLE`,
  UPDATE_ARTICLE: `${BASE_URL}/admin/updateARTICLE`,
  // 图片上传
  UPLOAD_IMG: `${BASE_URL}/admin/uploadImg`,
  // 错误日志
  ERROR_LOG: `${BASE_URL}/admin/getErrorLog`,
  DELETE_ERRORLOG: `${BASE_URL}/admin/deleteErrorLog`,
  //
  ROUTES: `${BASE_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`
}