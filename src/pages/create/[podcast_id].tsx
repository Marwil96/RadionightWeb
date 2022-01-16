import React, { useEffect, useState } from "react";
// import InputField from "../components/InputField";
// import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../../components/PodcastCard";
// import PodcastDetailsHeader from "../components/PodcastDetailsHeader";
import { FetchPodcastFromRSS, FilterSearch } from '../../other/helperFunctions'
import { FetchPodcastData, GetFollowedPremieres, GetPodcastPremieres, StartFollowingPodcast, StopFollowingPodcast } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { OpenEpisodePlayer, OpenRssPlayer } from "../../actions/globalActions";
import { useRouter } from "next/dist/client/router";
import Layout from "../../components/Layout";
import PodcastDetailsHeader from "../../components/PodcastDetailsHeader";
import CardGrid from "../../components/CardGrid";
import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/Button";
import { styled } from '../../../stitches.config';
import Input from "../../components/Input";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import TextArea from "../../components/TextArea";

const Wrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});

const Content = styled('div', {
  width: '100%',
  marginTop: '10rem',
  maxWidth: '65rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem 3.2rem',
  backgroundColor: '#1E1E1E',
  borderRadius: '1.2rem',
})

const Lable = styled('span', {
  fontSize: '$2',
  fontWeight: '500',
  marginBottom: '1rem'
})

const BackButton = styled('span', {
  fontSize: '$2',
  fontWeight: '500',
  marginBottom: '2.4rem',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  '&:hover': {
    opacity: 0.8
  },

  'svg': {
    marginRight: '0.8rem'
  }
})

const EpisodesContainer = styled('div', {
  // display: 'flex',
  // overflowX: 'scroll',
})

const PodcastDetails = () => {
  const router = useRouter();
  const { podcast_id } = router.query;

  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false)
  const [rssEpisodes, setRssEpisodes] = useState([]);
  const [episodes, setEpisodes] = useState('');
  const [rssFeedLimit, setRssFeedLimit] = useState(20);
  const [creationType, setCreationType] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  const [premiereTitle, setPremiereTitle] = useState('');
  const [premiereDesc, setPremiereDesc] = useState('');
  const [premiereImage, setPremiereImage] = useState('');
  const [premiereAudio, setPremiereAudio] = useState('');
  

  useEffect(() => {
    const FetchPodData = async () => {
      if(data === false && podcast_id !== undefined) {
        setLoading(true)
        console.log(podcast_id, data)
        const result = await FetchPodcastData(podcast_id);
        console.log(podcast_id, result)
        setData(result)
        FetchData(result.rss_url)
        setLoading(false)
      }
    }
    FetchPodData()
  }, [podcast_id]);


  const FetchData = async (rss_url: string) => {
    if (rss_url !== undefined) {
      setLoading(true);
      const podcastData = await FetchPodcastFromRSS(rss_url);

      setRssEpisodes(podcastData.items);
      setEpisodes(podcastData.items)
      setLoading(false);
    }
  };

  useEffect(() => {
    const result = FilterSearch(rssEpisodes, searchTerm);
    setEpisodes(result)
  }, [searchTerm])

  // FetchData();
  return (
    <Layout>
      {loading ? <h3>Loading</h3> : (
        <Wrapper>
          {creationType === '' ? 
          <Content>
            <Lable>How do you want to create the premiere?</Lable>
            <div style={{display: 'flex', marginTop: '1.2rem'}}>
              <Button color='primary' css={{marginRight: '1.6rem'}} fullWidth onClick={() => setCreationType('rss')}>RSS Feed</Button>
              <Button fullWidth onClick={() => setCreationType('scratch')}>From Scratch</Button>
            </div>
          </Content> : creationType === 'rss' ? 

          <Content>
            <BackButton onClick={() => setCreationType('')}><ArrowLeftIcon />Go back</BackButton>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
              <Lable>{selectedEpisode !== false ? `Selected episode: ${selectedEpisode.title}` : 'Select Episode'}</Lable>
             {selectedEpisode !== false && <BackButton css={{opacity: 0.6, fontWeight: 300, fontSize: '1.4rem'}} onClick={() => setSelectedEpisode(false)}>Pick another episode <ArrowRightIcon /></BackButton>}
            </div>
            {selectedEpisode === false && <Input placeholder='Episode Title' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} css={{marginBottom: '1.6rem'}} />}
            {selectedEpisode  !== false ? <PodcastCard title={selectedEpisode.title} image={data.image} desc={selectedEpisode.itunes.summary} />  : <EpisodesContainer>
               {episodes.map((episode: any, index: any) => (<PodcastCard title={episode.title} image={data.image} desc={episode.itunes.summary} type='carousel' onClick={() => setSelectedEpisode(episode)} />))}
            </EpisodesContainer>}
            
            {selectedEpisode !== false && <>   
              <Lable>Title of broadcast</Lable>
              <Input css={{marginBottom: '2.4rem'}} placeholder='title' value={selectedEpisode.title} />

              <Lable>Description</Lable>
              <TextArea css={{marginBottom: '2.4rem'}}  placeholder='title' value={selectedEpisode.itunes.subtitle} />

              <Lable>Audio File</Lable>
              <Input css={{marginBottom: '2.4rem'}} placeholder='title' value={selectedEpisode.enclosure.url} />
              <Button color='primary'>Start Episode Premiere</Button>
            </>}
          </Content> : 
          
          <Content>
            <BackButton onClick={() => setCreationType('')}><ArrowLeftIcon />Go back</BackButton>
            <Lable>Title of Premiere</Lable>
            <Input placeholder='Your Premiere title' />
          </Content>}
        </Wrapper>
      )}
    </Layout>
  );
};

export default PodcastDetails;
