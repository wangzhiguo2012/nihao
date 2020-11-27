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
export const dislikeArticle = articleId => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
export const reportArticle = (articleId, type) => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: articleId,
      type
    }
  })
}
export const getArticle = id => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/articles/' + id
  })
}
export const deleteLike = id => {
  return ajax({
    method: 'DELETE',
    url: '/app/v1_0/article/likings/' + id
  })
}

export const addLike = id => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: id
    }
  })
}
export const deleteDisLike = id => {
  return ajax({
    method: 'DELETE',
    url: '/app/v1_0/article/dislikes/' + id
  })
}
export const addDisLike = id => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: id
    }
  })
}
