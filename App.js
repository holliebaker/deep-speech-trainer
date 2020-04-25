import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default App = () => {
  const [buttonStates, setButtonStates] = useState({
    record: true,
    play: false,
    upload: false,
  })

  return (
    <View style={styles.container}>
      <Text>The quick brown starfox jumped over the lazy duck.</Text>

      <View style={styles.buttons}>
        <Button
          title='Record '
          color='#c40905'
          disabled={!buttonStates.record}
          onPress={_ => _}
        />
        <Button
          title='Play'
          color='#0905c4'
          disabled={!buttonStates.play}
          onPress={_ => _}
        />
        <Button
          title='Upload '
          color='#05c409'
          disabled={!buttonStates.upload}
          onPress={_ => _}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 16
  }
})
