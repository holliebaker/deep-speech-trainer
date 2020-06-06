import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import styles from '../util/styles'
import { MAIN } from '../util/screens'
import { save, load } from '../util/settings'

const SettingsScreen = ({ setScreen }) => {
  const [url, setUrl] = useState('test')
  const onSave = () => {
    save({ url })

    setScreen(MAIN)
  }

  useEffect(() => {
    load().then(settings => settings && setUrl(settings.url))
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text>Server URL:</Text>

        <TextInput
          textContentType='URL'
          value={url}
          onChangeText={setUrl}
        />
      </View>

      <View>
        <Button
          title='Save'
          onPress={onSave}
        />
      </View>
    </View>
  )
}

export default SettingsScreen
