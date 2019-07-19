// https://electronjs.org/docs/tutorial/notifications

export const notify = (text) => {
  const notification = new Notification('', {
    body: text
  })
  notification.onclick = () => {}
}
