import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'

import styles from '../util/styles'

const SettingsScreen = () => {
  const [url, setUrl] = useState('')
  const [user, setUser] = useState('')

  return (
    <View style={styles.container}>
      <View>
        <Text>Server URL:</Text>

        <TextInput
          onChongeText={setUrl}
          value={url}
        />
      </View>

      <View>
        <Text>Api User:</Text>

        <TextInput
          onChongeText={setUser}
          value={user}
        />
      </View>
    </View>
  )
}

export default SettingsScreen
