import { get } from 'react-native-axios' 

const BASE_URL = 'https://api.hameed.info'

export const fetchSentence = () =>
  get(BASE_URL + '/speech/v1.0/snippets/')
    .then(({ data }) => data)
