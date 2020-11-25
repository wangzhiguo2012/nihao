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
export const userGetInfo = () => {
  return ajax({
    url: '/app/v1_0/user/profile',
    method: 'GET',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE1MTg5OTgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlfQ.RoFWFm-44JktS0vuz4If2Q-OZeeFVERDdK8c6nCAUJs'
    }
  })
}
