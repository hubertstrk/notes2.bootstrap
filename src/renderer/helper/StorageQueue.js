import fileApi from '../api/file'
import noteApi from '../api/note'

const queue = []
let running = false

const add = (note) => {
  const index = queue.findIndex(x => x.id === note.id)
  if (index === -1) {
    queue.push(note)
  } else {
    queue.splice(index, 1)
    queue.push(note)
  }
}

const flush = () => {
  if (queue.length <= 0) return
  if (running) return

  try {
    running = true
    console.info(`queue contains ${queue.length} elements`)
    while (queue.length > 0) {
      const note = queue.shift()
      const buffer = noteApi.serialize(note)
      fileApi.writeBinary(note.directory, note.id, buffer)
      console.info(`note with id ${note.id} stored`)
    }
  } finally {
    console.info('queue flush finished')
    running = false
  }
}

export default {
  add,
  flush
}
