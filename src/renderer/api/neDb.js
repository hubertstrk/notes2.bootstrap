import directory from './directory'
const path = require('path')

const Datastore = require('nedb')

async function loadCollections (directories) {
  return directories.map((dir) => {
    return directory.readDirectory(dir, '.collection')
      .then((files) => {
        const match = files.filter(file => file.name.includes('.collection'))
        if (match.length > 1) {
          throw new Error(`found more than one history.collection files at ${dir}`)
        }

        const collection = match.length === 1 ? loadCollection(match[0]) : ensureCollection(dir)
        return {directory: dir, collection}
      })
  })
}

function loadCollection (match) {
  const collection = new Datastore({ filename: path.join(match.directory, match.name), autoload: true })
  collection.persistence.compactDatafile()
  return collection
}

function ensureCollection (dir) {
  const collection = new Datastore({filename: path.join(dir, 'history.collection'), autoload: true})
  collection.persistence.compactDatafile()
  return collection
}

async function createCollection (directory) {
  return ensureCollection(directory)
}

export default {
  loadCollections,
  createCollection
}
