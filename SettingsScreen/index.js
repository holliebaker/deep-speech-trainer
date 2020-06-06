import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import styles from '../util/styles'
import { MAIN } from '../util/screens'
import validate from '../util/is-valid-url'
import { save, load } from '../util/settings'

const SettingsScreen = ({ setScreen }) => {
  const [url, setUrl] = useState('')
  const [isValid, setIsValid] = useState(true)
  const onUrlChange = newUrl => {
    console.log(newUrl)
    setIsValid(validate(newUrl))
    setUrl(newUrl)
  }

  const [alertMessage, setAlert] = useState('')
  const onSave = () => {
    if (!isValid) {
      setAlert('Please ensure the url is valid, includes the protocol (http / https) at the start, and ends with a forward slash')

      return
    }

    save({ url })

    setScreen(MAIN)
  }

  useEffect(() => {
    load().then(settings =>
      settings && setUrl(settings.url)
    ).catch(e =>
      setAlert(e.message)
    )
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text>Server URL:</Text>

        <TextInput
          textContentType='URL'
          value={url}
          onChangeText={onUrlChange}
        />
      </View>

      <View>
        <Text>
          {alertMessage}
        </Text>
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
