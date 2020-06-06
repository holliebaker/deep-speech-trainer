import { clear } from './recorder'
import * as errorTypes from './error-types'

export default (triggerFetchSnippet, clearError, goToSettingsScreen) => type => {
  let onBack = null
  let onRetry = null
  let onSettings = null

  switch (type) {
    case errorTypes.FETCH_SNIPPET_ERROR:
      onRetry = () => triggerFetchSnippet()
      onSettings = () => goToSettingsScreen()

      break
    case errorTypes.SUBMIT_RECORDING_ERROR:
      onBack = () => {
        // clear the error, this will return the user to the recording screen
        clearError()
      }
      onSettings = () => goToSettingsScreen()

      break
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
    onRetry,
    onSettings
  }
}
