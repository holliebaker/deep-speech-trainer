import { get, patch } from 'react-native-axios'

export const fetchSnippet = url =>
  get(url + 'snippets/')
    .then(({ data }) => data)

export const submitRecording = (url, audio, { id, token }) =>
  patch(url + 'snippets/' + id, {
    id,
    status: 'y',
    token,
    audio
  })
