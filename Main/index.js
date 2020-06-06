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
  const [shouldFetchSnippet, setShouldFetchSnippet] = useState(false)
  const [snippet, setSnippet] = useState(null)
  const [snippetMetadata, setSnippetMetadata] = useState({})
  const [isLoading, setIsLoading] = useState(false)
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
    console.log('in mount')
    load().then(settings => {
      setUrl(settings.url)
      setShouldFetchSnippet(true)
    }).catch(e =>
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

    fetchSnippet(url).then(({ snippet, ...metadata }) => {
      if (!snippet) {
        throw new Error('No snippet was returned')
      }

      setSnippet(snippet)
      setSnippetMetadata(metadata)
    }).catch(
      handleError(errorTypes.FETCH_SNIPPET_ERROR)
    ).finally(() => {
      setIsLoading(false)
      setShouldFetchSnippet(false)
    })
  }, [url, hasPermission, shouldFetchSnippet])

  const uploadAudio = uri => {
    clearError()
    setIsLoading(true)

    prepareAudioForUpload(uri).then(base64 =>
      submitRecording(url, base64, snippetMetadata).then(res => {
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
    const { onBack, onRetry, onSettings } = getErrorActions(
      () => setShouldFetchSnippet(true),
      clearError,
      goToSettingsScreen
    )(errorType)

    return (
      <ErrorScreen
        error={error}
        onBack={onBack}
        onRetry={onRetry}
        onSettings={onSettings}
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

  return (
    <RecordingScreen
      text={snippet || 'No snippet was loaded'}
      onUpload={uploadAudio}
      onError={handleError(errorTypes.RECORDING_ERROR)}
      onSettings={goToSettingsScreen}
    />
  )
}

export default Main
