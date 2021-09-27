import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { AcceptInvitationToMod, DeclineInvitationToMod, GetCurrentlyLiveEpisodes, GetFollowedPremieres, LoginUser, SignOutUser } from '../actions';
import { FetchAllUserData } from '../actions/database'
import { useEffect, useState } from 'react'
import CardGrid from '../components/CardGrid'
import SectionHeader from '../components/SectionHeader'
import PodcastCard from '../components/PodcastCard'
import EmptyState from '../components/EmptyState'

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.AuthReducer);
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [notFollowedLiveEpisodes, setNotFollowedLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);
  const [loading, setLoading ] = useState(false);

  const FetchData = async () => {
    setLoading(true)
    const allEpisodes = await GetCurrentlyLiveEpisodes(user_data.followed_podcasts);
    setNotFollowedLiveEpisodes([...allEpisodes.upcomingEpisodes])
    
    console.log('all_episodes', allEpisodes)
    if(user_data.followed_podcasts !== undefined ) {
      const response = await GetFollowedPremieres(user_data.followed_podcasts);

      setUpcomingEpisodes(response.upcomingEpisodes);
      setLiveEpisodes(response.liveEpisodes);
      setPastEpisodes(response.pastEpisodes);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(user_data !== undefined) {
      FetchData();
    }
  },[])

  useEffect(() => {
    if(user_data !== undefined) {
      FetchData();
    }
  },[user_data])

  useEffect(() => { 
    if(userLoggedIn && user_data?.user_id === undefined) {
      dispatch(FetchAllUserData());
    }
  }, [userLoggedIn])
  
  useEffect(() => {
    console.log(user_data)
  }, [user_data])

  return (
    <Layout>
      <button style={{marginBottom: 16}} onClick={() => { dispatch(LoginUser({ email: 'william_martinsson@hotmail.com', password: 'Wille14' }))}}> Login </button>
      <button style={{marginBottom: 16}} onClick={() => { dispatch(SignOutUser())}}> Singout </button>
      
      {liveEpisodes.length === 0 && upcomingEpisodes.length === 0 && pastEpisodes.length === 0 && notFollowedLiveEpisodes.length === 0 && <EmptyState title='Start following a Podcast.' subtitle='Look through our collection of podcasts and see if something fits you...' buttonText='Search' onPress={() => navigation.navigate("DiscoverStack", { screen: 'Discover', params: {filter: false} })} imageUrl='https://firebasestorage.googleapis.com/v0/b/radionight-5dc07.appspot.com/o/images%2FFollow_podcast.png?alt=media&token=1125f71a-c466-4c81-9c9d-d9c14479a2b3' />}
      {liveEpisodes.length > 0 && (
        <SectionHeader title='Live Premieres' />
      )}
      <CardGrid>
        {liveEpisodes.length > 0 &&
          liveEpisodes.map((episode : any, index: any) => (
            <PodcastCard
              title={episode.title}
              subtitle={episode.podcast_name}
              key={index}
              // onClick={() => {
              //   dispatch(
              //     OpenEpisodePlayer({ data: { ...episode }, state: true })
              //   );
              // }}
              desc={episode.desc}
              image={episode.image}
              meta1={
                episode?.official === true
                  ? "Official Broadcast"
                  : "Community Broadcast"
              }
              meta2={episode.episode_is_running ? "LIVE" : "PREPARTY"}
            />
          ))}
        </CardGrid>
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

      {pastEpisodes.length > 0 && (
        <SectionHeader  title='Catch up on missed shows'/>
      )}

      <CardGrid>
        {pastEpisodes.length > 0 &&
          pastEpisodes.map((episode: any, index: any) => (
            <PodcastCard
              title={episode.title}
              // style={{ width: 300, paddingRight: 0, marginLeft: 0 }}
              subtitle={episode.podcast_name}
              key={index}
              desc={episode.desc}
              // onPress={() =>
              //   dispatch(
              //     OpenRssPlayer({
              //       data: {
              //         episode: {
              //           title: episode.title,
              //           itunes: { image: episode.image },
              //           enclosures: [{ url: episode.play_link }],
              //         },
              //         podcast: {
              //           title: episode.podcast_name,
              //           image: episode.image,
              //         },
              //       },
              //       state: true,
              //     })
              //   )
              // }
              image={episode.image}
              meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
                episode.start_date
              ).getMonth()}-${new Date(episode.start_date).getDate()}`}
              meta2='Replay'
            />
          ))}
        </CardGrid>

      {notFollowedLiveEpisodes.length > 0 && (
        <SectionHeader  title='You might like this...'/>
      )}
      
      <CardGrid>
        {notFollowedLiveEpisodes.length > 0 &&
          notFollowedLiveEpisodes.map((episode, index) => (
            <PodcastCard
              title={episode.title}
              subtitle={episode.podcast_name}
              key={index}
              desc={episode.desc}
              image={episode.image}
              // onPress={() => {
              //   dispatch(
              //     OpenEpisodePlayer({ data: { ...episode }, state: true })
              //   );
              // }}
              meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
                episode.start_date
              ).getMonth()}-${new Date(episode.start_date).getDate()}`}
              meta2={"LIVE"}
            />
          ))}
        </CardGrid>
    </Layout>
  )
}

export default Home
