import ajax from '../utils/request.js'
export const getSuggestion = keyword => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: { q: keyword }
  })
}
export const getSearch = (keyword, page) => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/search',
    params: { q: keyword, page }
  })
}
