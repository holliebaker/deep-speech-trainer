import * as Permissions from 'expo-permissions'
import { View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

import styles from '../util/styles'

const PermissionRequest = ({ permissions, onPermissionGranted, children }) => {
  const [permissionRequest, setPermissionRequest] = useState(true)
  const [permissionRefused, setPermissionRefused] = useState(false)
  useEffect(() => {
    if (!permissionRequest) return

    setPermissionRequest(false)
    setPermissionRefused(false)

    Promise.all(
      permissions.map(permission =>
        Permissions.askAsync(permission)
      )
    ).then(responses => {
      const allGranted = responses.filter(response =>
        response.status === 'granted'
      ).length === permissions.length

      allGranted
        ? onPermissionGranted()
        : setPermissionRefused(true)
    })
  }, [permissionRequest])

  // only show permission granting ui if permission has been actively refused
  // this is important because otherwise this ui flashes while a permission request is in progress
  if (!permissionRefused) return null

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
