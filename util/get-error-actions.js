import * as errorTypes from './error-types'

export default type => {
  let onBack = null
  let onRetry = null

  switch (type) {
    case errorTypes.FETCH_SNIPPET_ERROR:
      onRetry = () => setShouldFetchSnippet(true)
      break
    case errorTypes.SUBMIT_RECORDING_ERROR:
      onBack = () => {
        // clear the error, this will return the user to the recording screen
        setErrorType(errorTypes.NONE)
        setError(null)
     }
    case errorTypes.RECORDING_ERROR:
      onBack = () => {
        // clear the error, this will return the user to the recording screen
        setErrorType(errorTypes.NONE)
        setError(null)
        // it's likely that this error was caused by the recording getting into a weird state. so clear that as well
        clear()
      }
      break
    default:
  }

  return {
    onBack,
    onRetry
  }
}

