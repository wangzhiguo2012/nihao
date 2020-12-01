import axios from 'axios'
import store from '@/store/index.js'
import JSONBig from 'json-bigint'
import router from '@/router/index.js'
const instance1 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      console.log('JSONBig转换出错', err)
      return data
    }
  }]
})
instance1.interceptors.request.use(function (response) {
  return response
}, async function (error) {
  if (error.response.status === 401) {
    const refreshToken = store.state.tokenInfo.token.refresh_token
    if (refreshToken) {
      try {
        const result = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })
        const newToken = result.data.data.token
        store.commit('mUpdateToken', newToken)
        return instance1(error.config)
      } catch {
        router.push({
          path: '/login',
          query: {
            // router.currentRoute.fullPath :router中一个属性currentRoute表示当前路由对象
            backto: router.currentRoute.fullPath
          }
        })
      }
    } else {
      router.push({
        path: '/login',
        query: {
          // router.currentRoute.fullPath :router中一个属性currentRoute表示当前路由对象
          backto: router.currentRoute.fullPath
        }
      })
    }
  } else {
    return Promise.reject(error)
  }
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
