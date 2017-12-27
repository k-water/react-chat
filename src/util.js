export function getRedirectPath({type, avatar}) {
  let url = (type === 'Boy') ? '/boy' : '/girl'
  if (!avatar) {
    url += 'info'
  }
  console.log(url)
  return url
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}