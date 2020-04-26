import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'

import styles from '../styles'
import PermissionRequest from './PermissionRequest'

const RecordingScreen = ({ text }) => {
  const [buttonStates, setButtonStates] = useState({
    record: true,
    play: false,
    upload: false
  })

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
      <Text>{text}</Text>

      <View style={styles.buttons}>
        <Button
          title='Record '
          color='#c40905'
          disabled={!buttonStates.record}
          onPress={_ => _}
        />
        <Button
          title='Play'
          color='#0905c4'
          disabled={!buttonStates.play}
          onPress={_ => _}
        />
        <Button
          title='Upload '
          color='#05c409'
          disabled={!buttonStates.upload}
          onPress={_ => _}
        />
      </View>
    </View>
  )
}

export default RecordingScreen
