import { Audio } from 'expo-av'

let recording = null
let sound = null
let uri = null

export const clear = () => {
  recording = null
  sound = null
  uri = null
}

export const getUri = () => {
  if (!sound) return null

  return uri
}

export const record = () => {
  if (recording) {
    return Promise.reject(new Error('Bad state: Recording already initialised.'))
  }

  sound = null
  recording = new Audio.Recording()

  return recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY).then(() => {
    recording.startAsync()
  }).then(() => {
    uri = recording.getURI()
  })
}

export const stopRecording = () =>
  recording.stopAndUnloadAsync().then(() =>
    recording.createNewLoadedSoundAsync().then(result => {
      sound = result.sound

      recording = null
    })
  )

export const play = finishedCallback => {
  if (!sound) {
    Promise.reject(new Error('No recording to play.'))
  }

  sound.setOnPlaybackStatusUpdate(({ didJustFinish }) => {
    if (didJustFinish) {
      finishedCallback()

      sound.stopAsync() // rewind the audio, set position automatically replays
    }
  })
  return sound.playAsync()
}

export const stopPlaying = () => {
  if (!sound) {
    Promise.reject(new Error('No recording to play.'))
  }

  return sound.stopAsync()
}
