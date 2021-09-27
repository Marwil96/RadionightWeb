import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

const TopBar = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
`;

const CoverArt = styled.img`
  height:261px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 16px;
`

const PlayerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  font-family: "Manrope_400Regular";
  padding: 48px 0;
  min-height: 100%;
`;

const RssPlayer = ({ route, podcast, fetchEpisodeProgressStorage, episode, playSound, pauseSound, soundDuration, soundProgress, startedSound, runningEpisode,  playing, changeAudioPosition, slidingComplete, restartSound, runningPodcast }) => {
  const [episodePlayTime, setEpisodePlayTime] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchData = async () => {
      const response = await fetchEpisodeProgressStorage();
      setEpisodePlayTime(response)
    }
    FetchData()
  }, [])
  

  return (
    <MainContainer>
      <Wrapper>
        <TopBar>
          <ButtonContainer
            onPress={() => runningEpisode.title === episode.title ? dispatch(OpenRssPlayer({data: {episode: {...episode}, podcast: {...podcast}}, state: false})) : dispatch(OpenRssPlayer({data: {episode: {...runningEpisode}, podcast: {...runningPodcast}}, state: false}))}
          >
            <AntDesign
              style={{ marginRight: 12 }}
              name="back"
              size={24}
              color="white"
            />
            <Title style={{ fontSize: 16 }}>Go Back</Title>
          </ButtonContainer>
        </TopBar>
      </Wrapper>
      <PlayerWrapper>
        <CoverArt
          source={{
            uri:
              episode.itunes.image !== undefined
                ? episode.itunes.image
                : podcast.image,
          }}
        />
        <Title style={{ marginBottom: 4 }}>{episode.title}</Title>
        <Span style={{ color: colors.unFocused }}>{podcast.title}</Span>
        <Slider
          style={{ width: "100%" }}
          value={runningEpisode.title === episode.title ? soundProgress : episodePlayTime}
          maximumTrackTintColor={colors.primary}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
          // disabled={sound === false}
          maximumValue={soundDuration}
          onValueChange={(value) => changeAudioPosition(value)}
          onSlidingComplete={(e) => slidingComplete(e)}
          minimumValue={0}
        />
        <PlayerContainer>
          <TouchableOpacity
            style={{ padding: 10 }}
            // onPress={
            //   sound === false ? () => dispatch(PlaySound(episode.enclosures[0].url)) : playing ? pauseSound : restartSound
            // }
            onPress={ runningEpisode === false  || runningEpisode.title !== episode.title ? () => playSound() : playing ? pauseSound : restartSound}
          >
            <AntDesign
              name={runningEpisode.title === episode.title ? playing ? "pause" : "play" : 'play'}
              size={48}
              color="white"
            />
          </TouchableOpacity>
        </PlayerContainer>
      </PlayerWrapper>
    </MainContainer>
  );
};

export default RssPlayer;
