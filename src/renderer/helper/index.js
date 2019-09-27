export const arrayToLookup = (array, action, key) => {
  return array.reduce((lookup, item) => {
    lookup[item[key]] = action(item)
    return lookup
  }, {})
}

export const format = (dateTime) => {
  const date = new Date(dateTime)
  const minutes = `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
  const hours = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}`
  const seconds = `${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
  return `${date.toDateString()} ${hours}:${minutes}:${seconds}`
}
