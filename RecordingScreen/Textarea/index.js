import React from 'react'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { Text, View } from 'react-native'

import styles from '../../util/styles'

const LONG_PRESS_DURATION = 50

const Textarea = ({
  text,
  isLoading,
  isRecording,
  isPlaying,
  isRecordEnabled,
  onRecord,
  onStopRecording
}) => {
  const handleLongPress = ({ nativeEvent }) => {
    if (!isRecordEnabled) {
      return
    }

    switch (nativeEvent.state) {
      case State.ACTIVE:
        if (!isRecording) {
          onRecord()
        }

        break
      case State.END:
      case State.UNDEFINED:
      default:
        if (isRecording) {
          onStopRecording()
        }
    }
  }

  return (
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
  )
}

export default Textarea
