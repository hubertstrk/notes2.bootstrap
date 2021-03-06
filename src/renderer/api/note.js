import binary from './binary'
/**
 * Serialize a note into it's binary representation.
 *
 * @param {*} {starred, project, text}
 * @returns
 */
const serialize = ({starred, project, text, archived}) => {
  const starredBuffer = binary.encodeBoolean(starred)
  const archivedBuffer = binary.encodeBoolean(archived)
  const projectBuffer = binary.encodeString(project)
  const textBuffer = binary.encodeString(text)

  return Buffer.concat([starredBuffer, archivedBuffer, projectBuffer, textBuffer])
}
/**
 * Deserialize a buffer as note.
 *
 * @param {*} result
 * @returns
 */
const deserialize = (result) => {
  let length = 0
  let index = 0
  const buffer = Buffer.from(result)

  const starred = buffer[0] === 1
  index += 1

  const archived = buffer[1] === 1
  index += 1

  length = buffer.readUInt16BE(index)
  index += 16

  const project = buffer.toString('utf-8', index, index + length)
  index += length

  length = buffer.readUInt16BE(index)
  index += 16

  const text = buffer.toString('utf-8', index, index + length).replace(/\0/g, '')
  index += length

  return {starred, archived, project, text}
}

export default {
  serialize,
  deserialize
}
