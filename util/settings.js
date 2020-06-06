import * as FileSystem from 'expo-file-system'

const SETTINGS_FILE = FileSystem.documentDirectory + 'settings.json'

let cache = null

export const save = settings => {
  cache = save
  FileSystem.writeAsStringAsync(SETTINGS_FILE, JSON.stringify(settings))
}

export const load = async () => {
  if (cache) {
    return Promise.resolve(cache)
  }

  const json = await FileSystem.readAsStringAsync(SETTINGS_FILE)
  cache = JSON.parse(json)
  return cache
}
