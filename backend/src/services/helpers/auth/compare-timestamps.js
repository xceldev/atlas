module.exports = (dateTimestamp, jwtTimestamp) => {
  const date = new Date(dateTimestamp)
  const jwtDate = new Date(jwtTimestamp)

  if (date.getTime() < jwtDate.getTime()) {
    return -1
  }

  if (date.getTime() > jwtDate.getTime()) {
    return 1
  }

  return 0
}