import React from 'react'
import { View, Button } from 'react-native'

import styles from '../util/styles'
import * as screens from '../util/screens'

const buttonTextMap = {
  [screens.MAIN]: 'Settings',
  [screens.SETTINGS]: 'Done'
}

const buttonActionMap = {
  [screens.MAIN]: screens.SETTINGS,
  [screens.SETTINGS]: screens.MAIN
}

const SettingsScreen = ({ screen, setScreen }) => {
  const buttonText = buttonTextMap[screen]
  const targetScreen = buttonActionMap[screen]

  return (
    <View style={styles.titlebar}>
      <Button
        title={buttonText}
        onPress={() => setScreen(targetScreen)}
      />
    </View>
  )
}

export default SettingsScreen
