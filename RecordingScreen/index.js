import { View, Vibration } from 'react-native'
import React, { useState, useEffect } from 'react'

import Buttons from './Buttons'
import Textarea from './Textarea'
import styles from '../util/styles'
import * as recorder from '../util/recorder'

const VIBRATION_DURATION = 30

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

  const play = () => {
    setIsLoading(true)
    setIsPlaying(!isPlaying)

    recorder.play(
      () => setIsPlaying(false)
    ).then(() =>
      setIsLoading(false)
    ).catch(onError)
  }

  const stop = () => {
    setIsLoading(true)
    setIsPlaying(!isPlaying)

    return recorder.stopPlaying().then(() => setIsLoading(false)).catch(onError)
  }

  const isRecordEnabled = !isLoading && !isPlaying
  const isPlayEnabled = !isLoading && !isRecording && audioUri
  const isUploadEnabled = isPlayEnabled && !isPlaying

  return (
    <View style={styles.container}>
      <Textarea
        text={text}
        isRecording={isRecording}
        isRecordEnabled={isRecordEnabled}
        onRecord={startRecording}
        onStopRecording={stopRecording}
        isPlaying={isPlaying}
        isPlayEnabled={isPlayEnabled}
        onPlay={play}
        onStop={stop}
        isUploadEnabled={isUploadEnabled}
        onUpload={e => onUpload(audioUri)}
      />

      <Buttons
        text={text}
        isRecording={isRecording}
        isRecordEnabled={isRecordEnabled}
        onRecord={startRecording}
        onStopRecording={stopRecording}
        isPlaying={isPlaying}
        isPlayEnabled={isPlayEnabled}
        onPlay={play}
        onStop={stop}
        isUploadEnabled={isUploadEnabled}
        onUpload={e => onUpload(audioUri)}
      />
    </View>
  )
}

export default RecordingScreen
