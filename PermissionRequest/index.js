import * as Permissions from 'expo-permissions'
import { Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

import styles from '../util/styles'

const PermissionRequest = ({ permissions, onPermissionGranted, children }) => {
  const [permissionRequest, setPermissionRequest] = useState(true)
  useEffect(() => {
    if (!permissionRequest) return

    setPermissionRequest(false)

    Promise.all(
      permissions.map(permission =>
        Permissions.askAsync(permission)
      )
    ).then(responses => {
      const allGranted = responses.filter(response =>
        response.status === 'granted'
      ).length === permissions.length

      if (allGranted) {
        onPermissionGranted()
      }
    })
  }, [permissionRequest])

  return (
    <View style={styles.container}>
      {children}

      <Button
        title='Grant Permission'
        onPress={() => setPermissionRequest(true)}
      />
    </View>
  )
}

export default PermissionRequest
