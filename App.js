import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default App = () => {
  return (
    <View style={styles.container}>
      <Text>The quick brown starfox jumped over the lazy duck.</Text>

      <View>
        <Button
          title='Record'
          onPress={_ => _}
        />
        <Button
          title='Play Back Recording'
          onPress={_ => _}
        />
        <Button
          title='Upload Recording'
          onPress={_ => _}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
