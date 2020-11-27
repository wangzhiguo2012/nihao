import ajax from '@/utils/request.js'

export const addComment = (data) => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
export const getComments = params => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
export const addCommentLike = commentId => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
export const deleteCommentLike = commentId => {
  return ajax({
    method: 'DELETE',
    url: '/app/v1_0/comment/likings/' + commentId
  })
}
