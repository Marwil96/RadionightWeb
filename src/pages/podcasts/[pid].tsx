import React, { useEffect, useState } from "react";
// import InputField from "../components/InputField";
// import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../../components/PodcastCard";
// import PodcastDetailsHeader from "../components/PodcastDetailsHeader";
import { FetchPodcastFromRSS } from '../../other/helperFunctions'
import { FetchPodcastData, GetFollowedPremieres, GetPodcastPremieres, StartFollowingPodcast, StopFollowingPodcast } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { OpenEpisodePlayer, OpenRssPlayer } from "../../actions/globalActions";
import { useRouter } from "next/dist/client/router";
import Layout from "../../components/Layout";
import PodcastDetailsHeader from "../../components/PodcastDetailsHeader";
import CardGrid from "../../components/CardGrid";
import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/Button";

const PodcastDetails = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false)
  const [rssEpisodes, setRssEpisodes] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);
  const [rssFeedLimit, setRssFeedLimit] = useState(20);
  

  useEffect(() => {
    const FetchPodData = async () => {
      if(data === false && pid !== undefined) {
        setLoading(true)
        console.log(pid)
        const result = await FetchPodcastData(pid);
        console.log(pid, result)
        setData(result)
        FetchData(result.rss_url)
        setLoading(false)
      }
    }
    FetchPodData()
  }, [pid]);


  const FetchData = async (rss_url) => {
    if (rss_url !== undefined) {
      setLoading(true);
      const premieresData = await GetFollowedPremieres([pid]);
      const podcastData = await FetchPodcastFromRSS(rss_url);
      setUpcomingEpisodes(premieresData.upcomingEpisodes);
      setLiveEpisodes(premieresData.liveEpisodes);
      setPastEpisodes(premieresData.pastEpisodes);

      console.log(podcastData, podcastData.items)
      setRssEpisodes(podcastData.items);

      console.log(podcastData, premieresData)
      setLoading(false);
    }
  };

  // FetchData();
  return (
    <Layout>
      {loading ?<h3>Loading</h3> :<><PodcastDetailsHeader
        // bgColor={colors.background}
        // textColor={colors.text}
        title={data.title}
        categories={data.categories}
        image={data.image}
        official={data.verified_ownership}
        podcastId={pid}
        subtitle={data.categories.map((item: string, index: any) => `${item}${index === 0 && data.categories.length !== 1 ? ' & ' : ''}` )}
        isFollowed={user_data.followed_podcasts !== undefined && user_data?.followed_podcasts.includes(pid)}
        // subtitle="Business & Comedy"
        onButtonClick={(isFollowed: boolean) => {
          if (isFollowed) {
            StartFollowingPodcast(pid);
          } else {
            StopFollowingPodcast(pid);
          }
        }}
        desc={data.desc}
      />
      <>
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
        </>
     <>
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
        </>
     <>
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
        </>

        <>
     {rssEpisodes !== undefined && rssEpisodes.length > 0 && (
        <SectionHeader title='Rss Episodes' />
      )}
      <CardGrid>
        {rssEpisodes !== undefined && rssEpisodes.length > 0 &&
          rssEpisodes.map((episode : any, index: any) => {
            const publishedDate = new Date(episode.isoDate);
            if (index < rssFeedLimit) {
              return (
                <PodcastCard
                  title={episode.title}
                  subtitle={data.title}
                  key={index}
                  desc={
                    episode.itunes.summary !== undefined && episode.itunes.summary
                  }
                  image={
                    episode.itunes.image !== undefined
                      ? episode.itunes.image
                      : data.image
                  }
                  meta1={`${publishedDate.getDate()}-${publishedDate.getMonth()}-${publishedDate.getFullYear()}`}
                  meta2={episode.itunes.duration !== undefined && `${Math.floor(episode.itunes.duration / 60)}min` }
                />
              )
            }
          })}
        </CardGrid>
        {!loading &&
        rssFeedLimit !== rssEpisodes.length &&
        rssFeedLimit < rssEpisodes.length && (
            <Button
              primary
              onClick={() => setRssFeedLimit(rssFeedLimit + 20)}
            >
              See older Episodes
            </Button>
        )}
        </>
      </>
      }
      
    </Layout>
  );
};

export default PodcastDetails;
