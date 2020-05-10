import * as Permissions from 'expo-permissions'
import React, { useState, useEffect } from 'react'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { Text, View, Button, Vibration } from 'react-native'

import styles from '../styles'
import * as recorder from '../recorder'
import PermissionRequest from '../PermissionRequest'

const VIBRATION_DURATION = 50

const RecordingScreen = ({ text, onUpload, onError }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioUri, setAudioUri] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    // Load existing audio if it exists
    setAudioUri(recorder.getUri())
  }, [])

  const startRecording = () => {
    setIsLoading(true)

    recorder.record().then(() => {
      Vibration.vibrate(VIBRATION_DURATION)
      setIsLoading(false)
      setIsRecording(true)
    }).catch(onError)
  }

  const stopRecording = () => {
    setIsLoading(true)

    return recorder.stopRecording().then(() => {
      Vibration.vibrate(VIBRATION_DURATION)

      setIsLoading(false)
      setIsRecording(false)
      setAudioUri(recorder.getUri())
    }).catch(onError)
  }

  const onRecordPress = () => {
    isRecording
      ? stopRecording()
      : startRecording()
  }

  const handleLongPress = ({ nativeEvent }) => {
    if (isLoading || isPlaying) {
      return
    }

    switch (nativeEvent.state) {
      case State.BEGAN:
      case State.ACTIVE:
        if (!isRecording) {
          startRecording()
        }

        break
      case State.END:
      case State.UNDEFINED:
      default:
        if (isRecording) {
          stopRecording()
        }
    }
  }

  const onPlayPress = () => {
    setIsLoading(true)
    setIsPlaying(!isPlaying)

    if (isPlaying) {
      return recorder.stopPlaying().then(() => setIsLoading(false)).catch(onError)
    }

    recorder.play(
      () => setIsPlaying(false)
    ).then(() =>
      setIsLoading(false)
    ).catch(onError)
  }

  const [hasPermission, setHasPermission] = useState(false)
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

  return (
    <View style={styles.container}>
      <LongPressGestureHandler
        onHandlerStateChange={handleLongPress}
      >
        {/* Accessible makes TalkBack treat the view as a whole, resulting in a large touchable area */}
        <View
          accessible
          style={styles.swipeView}
        >
          <Text>{text}</Text>
        </View>
      </LongPressGestureHandler>

      <View style={styles.buttons}>
        <Button
          title={isRecording ? 'Stop' : 'Record'}
          color='#c40905'
          disabled={isLoading || isPlaying}
          onPress={onRecordPress}
        />
        <Button
          title={isPlaying ? 'Stop' : 'Play'}
          color='#05c409'
          disabled={isLoading || isRecording || !audioUri}
          onPress={onPlayPress}
        />
        <Button
          title='Upload'
          color='#0905c4'
          disabled={isLoading || isRecording || !audioUri || isPlaying}
          onPress={e => onUpload(audioUri)}
        />
      </View>
    </View>
  )
}

export default RecordingScreen
