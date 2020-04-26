import * as Permissions from 'expo-permissions'
import { Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

import styles from '../../styles'

const PermissionRequest = ({ onPermissionGranted }) => {
  const [permissionRequest, setPermissionRequest] = useState(true)
  useEffect(() => {
    setPermissionRequest(false)

    Permissions.askAsync(Permissions.AUDIO_RECORDING).then(response =>
      response.status === 'granted' && onPermissionGranted()
    )
  }, [permissionRequest])

  return (
    <View style={styles.container}>
      <Text>This app needs permission to record audio.</Text>

      <Button
        title='Grant Permission'
        onPress={() => setPermissionRequest(true)}
      />
    </View>
  )
}

export default PermissionRequest
