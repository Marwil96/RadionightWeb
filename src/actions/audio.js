// import { CREATE_AUDIO_STREAM } from "./constables";
// import { Audio } from "expo-av";

// export const PlaySound = (soundURL) => {
//   // console.log('PLAY SOOOOOOUND')
//   // return (dispatch) => {
//   //   FetchData(soundURL).then((sound) => {
//   //     console.log("PLAYING SOUND");
//   //     dispatch({ type: CREATE_AUDIO_STREAM, payload: { sound: sound } });
//   //   });
//   // }

//   return async function PlaySoundHelper(dispatch, getState) {
//     const { sound } = await Audio.Sound.createAsync({
//       uri: soundURL,
//     });
//     // sound.setOnPlaybackStatusUpdate(updateStatus);
//     // Audio.setAudioModeAsync({ staysActiveInBackground: true });
//     // await sound.playAsync();

//     dispatch({ type: CREATE_AUDIO_STREAM, payload: { sound: {} } });
//   };
// };


// const FetchData = async (soundURL) => {
//   const { sound } = await Audio.Sound.createAsync({
//         uri: soundURL,
//       });
//       // sound.setOnPlaybackStatusUpdate(updateStatus);
//       // Audio.setAudioModeAsync({ staysActiveInBackground: true });
//       // await sound.playAsync();
//       return sound
// }

// // const updateStatus = (status) => {
// //   // console.log(status.positionMillis, status.durationMillis);
// //   setSoundDuration(status.durationMillis);
// //   setSoundProgress(status.positionMillis);
// // };

// // const pauseSound = async () => {
// //   await sound.pauseAsync();
// //   setPlaying(false);
// // };

// // const restartSound = async () => {
// //   await sound.playAsync();
// //   setPlaying(true);
// // };

// // const changeAudioPosition = async (value) => {
// //   console.log(value);
// //   await sound.pauseAsync();
// //   setPlaying(false);
// //   setSoundProgress(value);
// //   // soundObject.setStatusAsync(statusToSet)
// // };

// // const slidingComplete = async (e) => {
// //   console.log("SLIDING COMPLETE");
// //   sound.playFromPositionAsync(soundProgress);
// //   await sound.playAsync();
// //   setPlaying(true);
// // };
