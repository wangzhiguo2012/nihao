import ajax from '../utils/request'
export const getChannels = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
