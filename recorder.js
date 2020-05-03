import { Audio } from 'expo-av'

let recording = null
let sound = null

export const record = () => {
  if (recording) throw new Error('Bad state: Recording already initialised.')

  recording = new Audio.Recording()

  return recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY).then(() =>
    recording.startAsync()
  ).then(() =>
    recording.getURI()
  )
}

export const stopRecording = () =>
  recording.stopAndUnloadAsync().then(() =>
    recording.createNewLoadedSoundAsync().then(result => {
      sound = result.sound

      recording = null
    })
  )

export const play = finishedCallback => {
  if (!sound) throw new Error('No recording to play.')

  sound.setOnPlaybackStatusUpdate(({ didJustFinish }) => {
    if (didJustFinish) {
      finishedCallback()

      sound.stopAsync() // rewind the audio, set position automatically replays
    }
  })
  return sound.playAsync()
}

export const stopPlaying = () => {
  if (!sound) throw new Error('No recording to play.')

  return sound.stopAsync()
}
