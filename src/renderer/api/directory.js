const fs = require('fs-extra')
const path = require('path')

/**
 * Asynchronously creates a directory
 *
 * @param {*} path
 * @returns
 */
const createDirectory = (path) => {
  return new Promise((resolve, reject) => {
    return fs.mkdir(path, (error) => {
      if (error) reject(error)
      resolve('folder created')
    })
  })
}

/**
 * Asynchronously retrieves a list of all folder or file name
 *
 * @param {*} directory
 * @returns
 */
const readDirectory = (directory) => {
  return new Promise((resolve) => {
    const names = fs.readdirSync(directory)
    const paths = names.map((name) => {
      return { directory, name }
    })
    resolve(paths)
  })
}

/**
 * Asynchronously deletes a directory
 *
 * @param {*} filepath
 * @param {*} filename
 * @returns
 */
const deleteDirectory = (filepath, filename) => {
  return new Promise((resolve, reject) => {
    fs.remove(path.join(filepath, filename), err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Asynchronously renames a folder
 *
 * @param {*} filepath
 * @param {*} filename
 * @param {*} newName
 * @returns
 */
const renameDirectory = (filepath, filename, newName) => {
  return new Promise((resolve, reject) => {
    const odlPath = path.join(filepath, filename)
    const newPath = path.join(filepath, newName)
    debugger
    fs.rename(odlPath, newPath, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export default {
  createDirectory,
  readDirectory,
  deleteDirectory,
  renameDirectory
}
