const fs = require('fs-extra')
const path = require('path')
const uuidv4 = require('uuid/v4')

/**
 * Asynchronously writes data to the file, replacing the file if it already exists
 *
 * @param {*} path
 * @param {*} name
 * @param {*} text
 * @returns
 */
const createFile = (path, name, text) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(path, name), text, 'utf8', (error) => {
      if (error) reject(error)
      resolve()
    })
  })
}

/**
 * Asynchronously reads the content of a file
 *
 * @param {*} path
 * @param {*} name
 * @returns
 */
const readFile = (directory, name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(directory, name), 'utf8', (error, text) => {
      if (error) reject(error)
      resolve(text)
    })
  })
}

/**
 * Asynchronously writes content to an existing file.
 *
 * @param {*} directory
 * @param {*} text
 * @returns
 */
const writeFile = (directory, data) => {
  return new Promise((resolve, reject) => {
    const uuid = uuidv4() // uuid is filename
    fs.appendFile(path.join(directory, uuid), data, 'utf8', (error) => {
      if (error) reject(error)
      resolve(uuid)
    })
  })
}

/**
 * Asynchronously writes binary content to a file.
 * In case the file exists it's content is being overwritten.
 *
 * @param {*} directory
 * @param {*} name
 * @param {*} data
 * @returns
 */
const writeBinary = (directory, name, data) => {
  return new Promise((resolve) => {
    var stream = fs.createWriteStream(path.join(directory, name))
    stream.write(data)
    stream.end()
    stream.on('finish', function () {
      resolve()
    })
  })
}

/**
 * Asynchronously deletes a file
 *
 * @param {*} directory
 * @param {*} filename
 * @returns
 */
const deleteFile = (directory, filename) => {
  return new Promise((resolve, reject) => {
    try {
      fs.unlinkSync(path.join(directory, filename))
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  createFile,
  readFile,
  writeFile,
  writeBinary,
  deleteFile
}
