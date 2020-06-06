import * as FileSystem from 'expo-file-system'

const SETTINGS_FILE = FileSystem.documentDirectory + 'settings.json'

export const save = settings => {
  console.log('save', JSON.stringify(settings))
  FileSystem.writeAsStringAsync(SETTINGS_FILE, JSON.stringify(settings))
}

export const load = async () => {
  try {
    const json = await FileSystem.readAsStringAsync(SETTINGS_FILE)
    console.log('load', json)
    return JSON.parse(json)
  } catch (e) {
    console.log('Unable to load settings: ', e.message)

    return {}
  }
}
