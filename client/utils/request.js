import axios from 'axios'
import qs from 'qs'
// 导入 qs parse 方法把序列化数据转对象  stringify方法 把对象转换为 需要序列化数据 {name:"mumu",age:18}

const BASEURL = process.env.NODE_ENV === 'development' ? 'http://www.wudongming.com:3001/api' : 'http://www.wudongming.com:3001/api'
// 设置基础URL  (区分开发环境和生产环境,设置不一样的baseurl)

const request = axios.create({
  baseURL: BASEURL,
  timeout: 2000
})

// 创建一个axios实例,设置实例的基础url和 超时时间
// requset.拦截器.请求.使用

request.interceptors.request.use(
  config => {
    // 发送请求需要做一些事情
    return config
  },
  err => Promise.reject(err)
)
// use 两个回调函数 ，第一个回调函数代表正确 reslove，第个回调函数错误 reject
// Promise.reject  再一次向上一一级抛出一个reject错误你
// 发送请求前个请求头headers 添加 token 头信息
// (每当是axios发起请求时候,先执行use里面回调函数方法,)
// (比如每次发起ajax请求 添加token，添加用户名 到header头信息里面)

// requset.拦截器.响应.使用
request.interceptors.response.use(
  (res) => {
    // 写一些业务逻辑  关闭加载提示,301 404 500 等错误响应
    //  res.data.status ==1 ==2 ==3 响应的公共逻辑
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.rejcet(error)
    }
  },
  err => Promise.reject(err)
)
// 响应请求拦截

// 拦截器就是再请求前，响应前 做一些额外的公共的的事情  请求前添加loading显示 响应前 移除loading
// request是有方法 也是 对象 对象的属性是可以动态的添加（动态添加了一个方法叫postURL）
request.post = function (url, data) {
  return new Promise(function (resolve, reject) {
    request({
        url: url,
        method: 'POST',
        data: qs.stringify(data)
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', ...option.headers }
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
request.get = function (url, data) {

  return new Promise(function (resolve, reject) {
    request({
        url: url,
        method: 'GET',
        params: data
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
// 添加一个 postURL方法,
// 最终返回的 当执行 postURL这个方法是最终返回的Promise对象的实例
// prosmie对象的实例 有两个结果 .then .catch（异步拿到-等待任意时间获取） 回调函数 成功
// .then 异步获取到 reslove 返回的数
// .catch 获取到 reject返回的 错误信息

export default request

// 导出 request 对象 当然就导出 request.postURL
