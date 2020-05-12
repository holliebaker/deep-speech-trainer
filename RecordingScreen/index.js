import * as Permissions from 'expo-permissions'
import React, { useState, useEffect } from 'react'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { Text, View, Button, Vibration } from 'react-native'

import Buttons from './Buttons'
import styles from '../util/styles'
import * as recorder from '../util/recorder'
import PermissionRequest from '../PermissionRequest'

const VIBRATION_DURATION = 30
const LONG_PRESS_DURATION = 50

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

  return (
    <View style={styles.container}>
      <LongPressGestureHandler
        maxDist={1000}
        minDurationMs={LONG_PRESS_DURATION}
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

      <Buttons
        isRecording={isRecording}
        isRecordEnabled={!isLoading && !isPlaying}
        onRecord={onRecordPress}
        isPlaying={isPlaying}
        isPlayEnabled={!isLoading && !isRecording && audioUri}
        onPlay={onPlayPress}
        isUploadEnabled={!isLoading && !isRecording && audioUri && !isPlaying}
        onUpload={e => onUpload(audioUri)}
      />
    </View>
  )
}

export default RecordingScreen
