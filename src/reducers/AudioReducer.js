import { CREATE_AUDIO_STREAM } from "../actions/constables";

const AudioReducer = (state = { sound: false}, action) => {
  switch (action.type) {
    // case CREATE_AUDIO_STREAM:
    //    return Object.assign({}, state, {
    //      sound: action.payload.sound,
    //    });
    default:
      return state;
  }
};

export default AudioReducer;
