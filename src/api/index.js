import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import "nprogress/nprogress.css"

const request = axios.create({
  baseURL: "http://121.4.32.3",
})

request.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

// 响应拦截器
request.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (err) => {
  return Promise.reject(new Error('faile'))
})

export default request