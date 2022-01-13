import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { FetchYourPodcasts } from '../actions';
import { FetchAllUserData } from '../actions/database'
import { useEffect, useState } from 'react'
import CardGrid from '../components/CardGrid'
import SectionHeader from '../components/SectionHeader'
import PodcastCard from '../components/PodcastCard'
import EmptyState from '../components/EmptyState'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.AuthReducer);
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading ] = useState(false);
  const router = useRouter();

  const FetchData = async () => {
    setLoading(true)

    if(user_data.owned_podcasts !== undefined ) {
      
      const podcastsData = await FetchYourPodcasts(user_data?.owned_podcasts);
      setPodcasts(podcastsData);
    }
    setLoading(false);
  }

  //   useEffect(() => {
  //   if (!loading && !userLoggedIn && user_data?.user_id === undefined) {
  //     router.push('/')
  //   }
  // }, [userLoggedIn, loading])

  useEffect(() => {
    if(user_data !== undefined) {
      FetchData();
      console.log(user_data)
    }
  },[user_data])

  useEffect(() => { 
    if(userLoggedIn && user_data?.user_id === undefined) {
      dispatch(FetchAllUserData());
    }
  }, [userLoggedIn])
  

  return (
    <Layout>
      {!userLoggedIn ? <Link href='/login' passHref><button>Go to Loginpage </button></Link> : 
      <>
      <SectionHeader title='Your Podcasts' />
      <CardGrid>
          {podcasts.length > 0 ? podcasts.map((podcast: any, index: any) => (
            <Link href={`podcasts/${podcast.id}`} passHref>
              <PodcastCard
                title={podcast.title}
                image={podcast.image}
                key={index}
              />
            </Link>
          )) : <EmptyState title='Start following a Podcast.' subtitle='Look through our collection of podcasts and see if something fits you...' buttonText='Search' imageUrl='https://firebasestorage.googleapis.com/v0/b/radionight-5dc07.appspot.com/o/images%2FFollow_podcast.png?alt=media&token=1125f71a-c466-4c81-9c9d-d9c14479a2b3' />}
      </CardGrid>
     </>}
    </Layout>
  )
}

export default Home
