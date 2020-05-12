import React from 'react'
import { View, Button } from 'react-native'

import styles from '../../util/styles'

const Buttons = ({
  isRecording,
  isPlaying,
  isRecordEnabled,
  isPlayEnabled,
  isUploadEnabled,
  onRecord,
  onStopRecording,
  onPlay,
  onStop,
  onUpload
}) => {
  const recordHandler = isRecording
    ? onStopRecording
    : onRecord

  const playHandler = isPlaying
    ? onStop
    : onPlay

  return (
    <View style={styles.buttons}>
      <Button
        title={isRecording ? 'Stop' : 'Record'}
        color='#c40905'
        disabled={!isRecordEnabled}
        onPress={recordHandler}
      />
      <Button
        title={isPlaying ? 'Stop' : 'Play'}
        color='#05c409'
        disabled={!isPlayEnabled}
        onPress={playHandler}
      />
      <Button
        title='Upload'
        color='#0905c4'
        disabled={!isUploadEnabled}
        onPress={onUpload}
      />
    </View>
  )
}

export default Buttons
