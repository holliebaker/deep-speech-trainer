import React from 'react'
import { View, Text, Button } from 'react-native'

import styles from '../styles'

const ErrorScreen = ({ error, onBack, onRetry }) =>
  <View style={styles.container}>
    <View style={styles.swipeView}>
      <Text>Error</Text>

      <Text>{error.message}</Text>

      {error.response && (
        <Text>
          {JSON.stringify({ 
            states: error.response.status,
            body: error.response.data,
            // data: error.response.config.data,
            method: error.response.method,
            url: error.response.url
          }, null, 2)}
        </Text>
      )}
    </View>

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
    </View>
  </View>

export default ErrorScreen
