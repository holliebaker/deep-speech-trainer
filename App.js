import React, { useState, useEffect } from 'react'

import { fetchSentence } from './api'
import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'
import RecordingScreen from './RecordingScreen'

const App = () => {
  const [sentence, setSentence] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchSentence().then(({ snippet }) =>
      setSentence(snippet)
    ).catch(e => {
      console.log(e.response)

      setError(e)
    })
  }, [])

  if (error) {
    return (
      <ErrorScreen error={error} />
    )
  }

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
