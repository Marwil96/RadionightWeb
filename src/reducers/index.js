import { combineReducers } from "redux";
// import AudioReducer from "./AudioReducer";
import AuthReducer from "./AuthReducer";
import DatabaseReducer from "./DatabaseReducer";
import GlobalActionsReducer from "./GlobalActionsReducer";

export default combineReducers({
  AuthReducer: AuthReducer,
  DatabaseReducer: DatabaseReducer,
  GlobalActionsReducer: GlobalActionsReducer,
  // AudioReducer: AudioReducer,
});
