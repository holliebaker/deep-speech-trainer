import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'

import styles from '../styles'
import * as recorder from '../recorder'
import PermissionRequest from './PermissionRequest'

const RecordingScreen = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioUri, setAudioUri] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onRecordPress = () => {
    setIsLoading(true)
    setIsRecording(!isRecording)

    if (isRecording) {
      return recorder.stopRecording().then(() => setIsLoading(false))
    }

    recorder.record().then(uri => {
      setAudioUri(uri)

      setIsLoading(false)
    })
  }

  const onPlayPress = () => {
    setIsLoading(true)
    setIsPlaying(!isPlaying)

    if (isPlaying) {
      return recorder.stopPlaying().then(() => setIsLoading(false))
    }

    recorder.play(
      () => setIsPlaying(false)
    ).then(() =>
      setIsLoading(false)
    )
  }

  const [hasPermission, setHasPermission] = useState(false)
  if (!hasPermission) {
    return (
      <PermissionRequest
        onPermissionGranted={() => console.log('granted!') || setHasPermission(true)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.swipeView}>
        <Text>{text}</Text>
      </View>

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
          onPress={_ => _}
        />
      </View>
    </View>
  )
}

export default RecordingScreen
