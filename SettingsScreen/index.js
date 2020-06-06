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
      setUrl(settings.url)
    ).catch(e => {
      console.log(e)

      setAlert('Unable to load saved settings - this may be because no settings have been saved yet.')
    })
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text>Server URL:</Text>

        <TextInput
          autoFocus
          placeholder='https://example.com/speech/v1.0/'
          textContentType='URL'
          autoCorrect={false}
          autoCapitalize={'none'}
          enablesReturnKeyAutomatically
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
