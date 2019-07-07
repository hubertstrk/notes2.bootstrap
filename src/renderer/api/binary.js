const encodeString = (data) => {
  const encoded = Buffer.alloc(16 + Buffer.byteLength(data))
  encoded.writeUInt16BE(Buffer.byteLength(data))
  encoded.write(data, 16)
  return encoded
}

const encodeBoolean = (data) => {
  const encoded = Buffer.alloc(1)
  encoded[0] = data ? 1 : 0
  return encoded
}

export default {
  encodeString,
  encodeBoolean
}
