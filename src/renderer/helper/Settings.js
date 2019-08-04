const electron = require('electron')
const path = require('path')
const fs = require('fs')

const settingsFileName = 'notes-user-settings'

const fullFileName = () => {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData')
  return path.join(userDataPath, settingsFileName + '.json')
}

export const ensureSettingsFile = () => {
  const path = fullFileName()
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK || fs.constants.W_OK, (error) => { // F_OK => writable; F_OK => exists
      if (error && error.code === 'ENOENT') {
        try {
          fs.appendFileSync(path, '{}')
          resolve(true)
        } catch (error) {
          reject(error)
        }
      }
      resolve(false)
    })
  })
}

export const readSettings = () => {
  const path = fullFileName()
  return new Promise((resolve, reject) => {
    try {
      const settings = JSON.parse(fs.readFileSync(path))
      resolve(settings)
    } catch (error) {
      reject(error)
    }
  })
}

export const writeSettings = (settings) => {
  const path = fullFileName()
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(path, JSON.stringify(settings))
      resolve(settings)
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  ensureSettingsFile,
  readSettings,
  writeSettings
}
