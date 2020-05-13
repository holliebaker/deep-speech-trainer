import React, { useState } from 'react'

import Main from './Main'
import Titlebar from './Titlebar'
import * as screens from './util/screens'
import ErrorBoundary from './ErrorBoundary'
import SettingsScreen from './SettingsScreen'

const screenMap = {
  [screens.MAIN]: Main,
  [screens.SETTINGS]: SettingsScreen
}

export default () => {
  const [screen, setScreen] = useState(screens.MAIN)
  const Screen = screenMap[screen]

  return (
    <ErrorBoundary>
      <Titlebar
        screen={screen}
        setScreen={setScreen}
      />

      <Screen />
    </ErrorBoundary>
  )
}
