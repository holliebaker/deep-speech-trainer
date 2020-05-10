import React, { useState, useEffect } from 'react'
import { ToastAndroid } from 'react-native'

import ErrorScreen from '../ErrorScreen'
import { clear } from '../recorder'
import LoadingScreen from '../LoadingScreen'
import * as errorTypes from '../error-types'
import RecordingScreen from '../RecordingScreen'
import { fetchSentence, submitRecording } from '../api'
import prepareAudioForUpload from '../prepare-audio-for-upload.js'

const Main = () => {
  // TODO snippet not sentence
  const [shouldFetchSnippet, setShouldFetchSnippet] = useState(true)
  const [sentence, setSentence] = useState(null)
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
    fetchSentence().then(({ snippet, ...metadata }) => {
      setSentence(snippet)
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
    let onBack = null
    let onRetry = null

    switch (errorType) {
      case errorTypes.FETCH_SNIPPET_ERROR:
        onRetry = () => setShouldFetchSnippet(true)
        break
      case errorTypes.SUBMIT_RECORDING_ERROR:
      case errorTypes.RECORDING_ERROR:
        onBack = () => {
          // clear the error, this will return the user to the recording screen
          setErrorType(errorTypes.NONE)
          setError(null)
        }
        break
      default:
    }

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

  if (!sentence) return null

  return (
    <RecordingScreen
      text={sentence}
      onUpload={uploadAudio}
      onError={handleError(errorTypes.RECORDING_ERROR)}
    />
  )
}

export default Main
