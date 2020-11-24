import ajax from '../utils/request'
export const getChannels = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
export const getAllChannels = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
export const addChannel = channels => {
  return ajax({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
