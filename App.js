import React, { useState, useEffect } from 'react'

import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'
import RecordingScreen from './RecordingScreen'
import { fetchSentence, submitRecording } from './api'
import prepareAudioForUpload from './prepare-audio-for-upload.js'

const App = () => {
  // TODO snippet not sentence
  const [sentence, setSentence] = useState(null)
  const [snippetMetadata, setSnippetMetadata] = useState({})
  const [error, setError] = useState(null)
  const handleError = e => {
    console.log(e.response)

    setError(e)
  }

  useEffect(() => {
    fetchSentence().then(({ snippet, ...metadata }) => {
      setSentence(snippet)
      setSnippetMetadata(metadata)
    }).catch(handleError)
  }, [])

  const uploadAudio = uri => {
    prepareAudioForUpload(uri).then(base64 => 
      submitRecording(base64, snippetMetadata).then(res =>
        // TODO proper handling of success - display a success toast message and load another snippet
        setSentence('Success!')
      ).catch(handleError)
    )
  }

  if (error) {
    return (
      <ErrorScreen error={error} />
    )
  }

  if (!sentence) {
    return <LoadingScreen />
  }

  return (
    <RecordingScreen
      text={sentence}
      onUpload={uploadAudio}
    />
  )
}

export default App
