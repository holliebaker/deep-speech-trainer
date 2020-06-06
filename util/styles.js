import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  titlebar: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#b7b7b7',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  fillSpace: {
    flex: 1,
    justifyContent: 'center'
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16
  }
})

export default styles
