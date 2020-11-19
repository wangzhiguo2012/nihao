export const getItem = name => {
  return JSON.parse(localStorage.getItem(name))
}
export const setItem = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj))
}
export const removeItem = name => {
  localStorage.removeItem(name)
}
