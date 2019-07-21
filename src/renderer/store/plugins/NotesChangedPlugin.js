import queue from '../../helper/StorageQueue'

const notesChangedPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'editor/updateNote') {
      queue.add(mutation.payload)
    }
  })

  // setInterval(queue.flush, 1000)
}

export default notesChangedPlugin
