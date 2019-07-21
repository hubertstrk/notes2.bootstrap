import fileApi from '../api/file'
import noteApi from '../api/note'

const queue = []

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

  while (queue.length > 0) {
    const note = queue.shift()
    const buffer = noteApi.serialize(note)
    fileApi.writeBinary(note.directory, note.id, buffer)
  }
}

export default {
  add,
  flush
}
