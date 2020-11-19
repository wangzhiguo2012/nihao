import axios from 'axios'
import store from '@/store/index.js'
const instance1 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
instance1.interceptors.request.use(function (config) {
  const token = store.state.tokenInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},
function (error) {
  return Promise.reject(error)
})
const instance2 = axios.create({
  baseURL: 'https://some-xxxxx.com/api/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})

export {
  instance1,
  instance2
}
export default instance1
