import React, { useState, useEffect } from 'react'
import { ToastAndroid } from 'react-native'

import ErrorScreen from '../ErrorScreen'
import { clear } from '../util/recorder'
import LoadingScreen from '../LoadingScreen'
import * as errorTypes from '../util/error-types'
import RecordingScreen from '../RecordingScreen'
import getErrorActions from '../util/get-error-actions'
import { fetchSnippet, submitRecording } from '../util/api'
import prepareAudioForUpload from '../util/prepare-audio-for-upload.js'

const Main = () => {
  const [shouldFetchSnippet, setShouldFetchSnippet] = useState(true)
  const [snippet, setSnippet] = useState(null)
  const [snippetMetadata, setSnippetMetadata] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorType, setErrorType] = useState(errorTypes.NONE)
  const [error, setError] = useState(null)
  const handleError = type => e => {
    console.log(e.response)

    setError(e)
    setErrorType(type)
  }

  useEffect(() => {
    if (!shouldFetchSnippet) return

    clear() // clear any recordings of previous snippets
    setError(null)
    setErrorType(errorTypes.NONE)
    setIsLoading(true)
    fetchSnippet().then(({ snippet, ...metadata }) => {
      setSnippet(snippet)
      setSnippetMetadata(metadata)
    }).catch(
      handleError(errorTypes.FETCH_SMIPPET_ERROR)
    ).finally(() => {
      setIsLoading(false)
      setShouldFetchSnippet(false)
    })
  }, [shouldFetchSnippet])

  const uploadAudio = uri => {
    setErrorType(errorTypes.NONE)
    setError(null)
    setIsLoading(true)

    prepareAudioForUpload(uri).then(base64 =>
      submitRecording(base64, snippetMetadata).then(res => {
        ToastAndroid.show(
          'Upload successful!',
          ToastAndroid.SHORT
        )

        setShouldFetchSnippet(true)
      }).catch(
        handleError(errorTypes.SUBMIT_RECORDING_ERROR)
      ).finally(() => {
        setIsLoading(false)
      })
    )
  }

  if (errorType) {
    const { onBack, onRetry } = getErrorActions(errorType)

    return (
      <ErrorScreen
        error={error}
        onBack={onBack}
        onRetry={onRetry}
      />
    )
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!snippet) return null

  return (
    <RecordingScreen
      text={snippet}
      onUpload={uploadAudio}
      onError={handleError(errorTypes.RECORDING_ERROR)}
    />
  )
}

export default Main
