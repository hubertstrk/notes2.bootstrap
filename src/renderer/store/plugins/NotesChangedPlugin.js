import queue from '../../helper/StorageQueue'

const notesChangedPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'editor/updateNote') {
      if (mutation.payload.id) {
        queue.add(mutation.payload)
      }
    }
  })

  setInterval(queue.flush, 3000)
}

export default notesChangedPlugin
