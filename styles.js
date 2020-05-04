import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },

  swipeView: {
    flex: 1,
    justifyContent: 'center'
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 16
  }
})

export default styles
