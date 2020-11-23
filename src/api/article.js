import ajax from '../utils/request'
export const getArticles = (channelId, timestamp) => {
  return ajax({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp,
      with_top: 1

    }
  })
}
