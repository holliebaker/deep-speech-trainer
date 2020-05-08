import React from 'react'
import { View, Text } from 'react-native'

import styles from '../styles'

const ErrorScreen = ({ error }) =>
  <View style={styles.container}>
    <Text>Error</Text>

    <Text>{error.message}</Text>
  </View>

export default ErrorScreen
