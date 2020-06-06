import React from 'react'
import { ScrollView, View, Text, Button } from 'react-native'

import styles from '../util/styles'

const mapResponse = response => ({
  status: response.status,
  url: response.request.url,
  method: response.request.method,
  responseBody: response.data,
  requestBody: response.config.data
})

const ErrorScreen = ({ error, onBack, onRetry, onSettings }) => {
  const errorResponse = error.response && mapResponse(error.response)

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Error</Text>

        <Text>{error.message}</Text>

        {onSettings && (
          <Text>
          Updating your settings may resolve this error.
          </Text>
        )}

        {errorResponse && Object.keys(errorResponse).map(k => (
          <Text key={k}>{k}: {errorResponse[k]}</Text>
        ))}
      </ScrollView>

      <View style={styles.buttons}>
        {onBack && (
          <Button
            title='Back'
            onPress={onBack}
          />
        )}
        {onRetry && (
          <Button
            title='Retry'
            onPress={onRetry}
          />
        )}
        {onSettings && (
          <Button
            title='Settings'
            onPress={onSettings}
          />
        )}
      </View>
    </View>
  )
}

export default ErrorScreen
