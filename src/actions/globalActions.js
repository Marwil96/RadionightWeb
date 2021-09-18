import { OPEN_RSS_PLAYER, OPEN_EPISODE_PLAYER } from "./constables";


export const OpenRssPlayer = ({data, state}) => {
  return(dispatch) => {
    dispatch({ type: OPEN_RSS_PLAYER, payload: { rssPlayerState: state, rssPlayerData: data } });
  }
};

export const OpenEpisodePlayer = ({data, state}) => {
  console.log('OPEN EPISODE PLAYER', data)
  return(dispatch) => {
    dispatch({ type: OPEN_EPISODE_PLAYER, payload: { episodePlayerState: state, episodePlayerData: data } });
  }
};
