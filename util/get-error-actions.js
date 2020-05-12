import { clear } from './recorder'
import * as errorTypes from './error-types'

export default (triggerFetchSnippet, clearError) => type => {
  let onBack = null
  let onRetry = null

  switch (type) {
    case errorTypes.FETCH_SNIPPET_ERROR:
      onRetry = () => triggerFetchSnippet() 
      break
    case errorTypes.SUBMIT_RECORDING_ERROR:
      onBack = () => {
        // clear the error, this will return the user to the recording screen
        clearError()
     }
    case errorTypes.RECORDING_ERROR:
      onBack = () => {
        // clear the error, this will return the user to the recording screen
        clearError()
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

