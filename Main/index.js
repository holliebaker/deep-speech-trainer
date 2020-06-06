import * as Permissions from 'expo-permissions'
import React, { useState, useEffect } from 'react'
import { Text, ToastAndroid } from 'react-native'

import { load } from '../util/settings'
import ErrorScreen from '../ErrorScreen'
import { clear } from '../util/recorder'
import { SETTINGS } from '../util/screens'
import LoadingScreen from '../LoadingScreen'
import RecordingScreen from '../RecordingScreen'
import * as errorTypes from '../util/error-types'
import PermissionRequest from '../PermissionRequest'
import getErrorActions from '../util/get-error-actions'
import { fetchSnippet, submitRecording } from '../util/api'
import prepareAudioForUpload from '../util/prepare-audio-for-upload.js'

const Main = ({ setScreen }) => {
  const [url, setUrl] = useState(null)
  const [hasPermission, setHasPermission] = useState(false)
  const [shouldFetchSnippet, setShouldFetchSnippet] = useState(true)
  const [snippet, setSnippet] = useState(null)
  const [snippetMetadata, setSnippetMetadata] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorType, setErrorType] = useState(errorTypes.NONE)
  const [error, setError] = useState(null)

  const goToSettingsScreen = () => setScreen(SETTINGS)

  const handleError = type => e => {
    console.log(e.response)

    setError(e)
    setErrorType(type)
  }

  const clearError = () => {
    setError(null)
    setErrorType(errorTypes.NONE)
  }

  // load settings on mount
  useEffect(() => {
    load().then(settings =>
      setUrl(settings.url)
    ).catch(e =>
      // if there was a problem with loading the settings, the user probably wants to visit the settings screen to fix
      // it
      goToSettingsScreen()
    )
  }, [])

  // reload snippet
  useEffect(() => {
    if (!url || !hasPermission || !shouldFetchSnippet) return

    clear() // clear any recordings of previous snippets
    clearError()
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
  }, [url, hasPermission, shouldFetchSnippet])

  const uploadAudio = uri => {
    clearError()
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
    const { onBack, onRetry } = getErrorActions(
      clearError,
      () => setShouldFetchSnippet(true)
    )(errorType)

    return (
      <ErrorScreen
        error={error}
        onBack={onBack}
        onRetry={onRetry}
      />
    )
  }

  if (!hasPermission) {
    return (
      <PermissionRequest
        permissions={[
          Permissions.AUDIO_RECORDING
        ]}
        onPermissionGranted={() => setHasPermission(true)}
      >
        <Text>Please grant permission to record audio.</Text>
      </PermissionRequest>
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
      onSettings={goToSettingsScreen}
    />
  )
}

export default Main
