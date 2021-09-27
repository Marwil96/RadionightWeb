import React, { useEffect } from "react";
import { useState } from "react";
import Layout from '../components/Layout'
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FetchAllUserData, FetchYourPodcasts, GetFollowedPremieres } from "../actions";
// import { OpenEpisodePlayer, OpenRssPlayer } from "../actions/globalActions";
import EmptyState from "../components/EmptyState";
import PodcastCard from "../components/PodcastCard";
import CardGrid from '../components/CardGrid'
import SectionHeader from '../components/SectionHeader'
import ToggleBar from "../components/ToggleBar";
import { useRouter } from "next/dist/client/router";

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 24px;
`;

const DisplayModeTitle = styled.span`
  font-size: ${props => props.active ?  '3.2rem' : '2.4rem'};
  font-family: ${props => props.active ? "Manrope_500Medium" : "Manrope_400Regular"};
  margin-right: 1.6rem;
  color: ${props => props.active ? `var(--white)` : `var(--unfocussed)`};
  cursor: pointer;

  &:hover {
    color: var(--primary);
  }
`;


const Following = () => {
  const router = useRouter();
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const { userLoggedIn } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [podcasts, setPodcasts] = useState([]);
  const [displayMode, setDisplayMode] = useState("episodes");
  const [toggleMode, setToggleMode] = useState('Live')
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);

  const FetchData = async () => {
    setLoading(true)
    console.log('FETCHING DATA', user_data?.followed_podcasts !== undefined)
    if(user_data?.followed_podcasts !== undefined) {
      const response = await GetFollowedPremieres(user_data?.followed_podcasts);
      setUpcomingEpisodes(response.upcomingEpisodes);
      setLiveEpisodes(response.liveEpisodes);
      setPastEpisodes(response.pastEpisodes);
      const podcastsData = await FetchYourPodcasts(user_data?.followed_podcasts);
      console.log(podcastsData)
      setPodcasts(podcastsData);
    }
    setLoading(false);
  }
  useEffect(() => {
    console.log('USERDATA', user_data)
    if(user_data !== undefined) {
      FetchData();
    }
  },[user_data])

  useEffect(() => { 
    if(userLoggedIn && user_data?.user_id === undefined) {
      dispatch(FetchAllUserData());
    }
  }, [userLoggedIn])

  return (
    <Layout>
      {loading  ? <h3>Loading</h3>  : <> <TitleWrapper>
        <DisplayModeTitle
          onClick={() => setDisplayMode("episodes")}
          active={displayMode === "episodes"}
        >
          Premieres
        </DisplayModeTitle>
        <DisplayModeTitle
          onClick={() => setDisplayMode("shows")}
          active={displayMode === "shows"}
        >
          Shows
        </DisplayModeTitle>
      </TitleWrapper>
    {displayMode === 'episodes' ? <>
      <ToggleBar
        items={["Live", "Upcoming", "Past"]}
        onChange={(value: string) => setToggleMode(value)}
        style={{marginBottom :24}}
      />
      {toggleMode === 'Live' && <>
     {liveEpisodes.length > 0 && (
        <SectionHeader title='Upcoming Premieres of Followed Podcasts' />
      )}
      <CardGrid>
        {liveEpisodes.length > 0 &&
          liveEpisodes.map((episode : any, index: any) => (
            <PodcastCard
              title={episode.title}
              subtitle={episode.podcast_name}
              key={index}
              desc={episode.desc}
              image={episode.image}
              meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
                episode.start_date
              ).getMonth()}-${new Date(episode.start_date).getDate()}`}
              meta2={`${new Date(episode.start_date).getHours()}:${new Date(
                episode.start_date
              ).getMinutes()}:00`}
            />
          ))}
        </CardGrid>
        </>}
    {toggleMode === 'Upcoming' && <>
     {upcomingEpisodes.length > 0 && (
        <SectionHeader title='Upcoming Premieres of Followed Podcasts' />
      )}
      <CardGrid>
        {upcomingEpisodes.length > 0 &&
          upcomingEpisodes.map((episode : any, index: any) => (
            <PodcastCard
              title={episode.title}
              subtitle={episode.podcast_name}
              key={index}
              desc={episode.desc}
              image={episode.image}
              meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
                episode.start_date
              ).getMonth()}-${new Date(episode.start_date).getDate()}`}
              meta2={`${new Date(episode.start_date).getHours()}:${new Date(
                episode.start_date
              ).getMinutes()}:00`}
            />
          ))}
        </CardGrid>
        </>}
    {toggleMode === 'Past' && <>
     {pastEpisodes.length > 0 && (
        <SectionHeader title='Upcoming Premieres of Followed Podcasts' />
      )}
      <CardGrid>
        {pastEpisodes.length > 0 &&
          pastEpisodes.map((episode : any, index: any) => (
            <PodcastCard
              title={episode.title}
              subtitle={episode.podcast_name}
              key={index}
              desc={episode.desc}
              image={episode.image}
              meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
                episode.start_date
              ).getMonth()}-${new Date(episode.start_date).getDate()}`}
              meta2={`${new Date(episode.start_date).getHours()}:${new Date(
                episode.start_date
              ).getMinutes()}:00`}
            />
          ))}
        </CardGrid>
        </>}
      </> : 
      <CardGrid>
          {podcasts.length > 0 ? podcasts.map((podcast: any, index: any) => (
            <PodcastCard
              title={podcast.title}
              image={podcast.image}
              key={index}
              onClick={() =>
                router.push(`podcasts/${podcast.id}`)
              }
            />
          )) : <EmptyState title='Start following a Podcast.' subtitle='Look through our collection of podcasts and see if something fits you...' buttonText='Search' onClick={() => router.push("/podcast/", { screen: 'Discover' })} imageUrl='https://firebasestorage.googleapis.com/v0/b/radionight-5dc07.appspot.com/o/images%2FFollow_podcast.png?alt=media&token=1125f71a-c466-4c81-9c9d-d9c14479a2b3' />}
      </CardGrid>} </>}
    </Layout>
  );
};

export default Following;
