import { readAsStringAsync, EncodingType } from 'expo-file-system'

export default uri =>
  readAsStringAsync(uri, { encoding: EncodingType.Base64 })
