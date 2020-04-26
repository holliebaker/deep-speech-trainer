import React, { useState, useEffect } from 'react'

import { fetchSentence } from './api'
import LoadingScreen from './LoadingScreen'
import RecordingScreen from './RecordingScreen'

const App = () => {
  const [sentence, setSentence] = useState(null)
  useEffect(() => {
    fetchSentence().then(newSentence =>
      setSentence(newSentence)
    )
  }, [])

  if (!sentence) {
    return <LoadingScreen />
  }

  return (
    <RecordingScreen
      text={sentence}
    />
  )
}

export default App
