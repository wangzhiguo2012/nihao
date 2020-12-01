// 用户登陆
import ajax from '@/utils/request.js'
export const userLogin = (mobile, code) => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
// 用户个人信息
export const userGetInfo = () => {
  return ajax({
    url: '/app/v1_0/user/profile',
    method: 'GET'

  })
}
// 用户编号
export const followUser = userId => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const unFollowUser = userId => {
  return ajax({
    method: 'DELETE',
    url: '/app/v1_0/user/followings/' + userId
  })
}
// 获取用户自己的信息
export const getInfo = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
export const updateUserInfo = data => {
  return ajax({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
export const updatePhoto = (formData) => {
  return ajax({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data: formData
  })
}
