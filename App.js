import React, { useState } from 'react'

import Main from './Main'
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
      <Screen setScreen={setScreen} />
    </ErrorBoundary>
  )
}
