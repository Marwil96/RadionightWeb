import {OPEN_EPISODE_PLAYER, OPEN_RSS_PLAYER } from "../actions/constables";

const GlobalActionsReducer = (state = { rssPlayerState: false, rssPlayerData: {}, episodePlayerState: false, episodePlayerData: {}}, action) => {
  switch (action.type) {
    case OPEN_RSS_PLAYER:
      return {
        rssPlayerState: action.payload.rssPlayerState,
        rssPlayerData: action.payload.rssPlayerData,
      };

    case OPEN_EPISODE_PLAYER:
      return {
        episodePlayerState: action.payload.episodePlayerState,
        episodePlayerData: action.payload.episodePlayerData,
      };
    default:
      return state;
  }
};

export default GlobalActionsReducer;
