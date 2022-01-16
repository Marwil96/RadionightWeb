import * as rssParser from "react-native-rss-parser";
import RSSParser from 'rss-parser';

// import { Audio } from "expo-av";

export const FilterSearch = (library?:any, searchTerm:string, limit?: any) => {
  const searchResult = limit
    ? library
        .filter(
          (el) =>
            el.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        )
        .slice(0, limit)
    : library.filter(
        (el) => el.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );

  return searchResult;
};

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

export const FetchPodcastFromRSS = async (url: string) => {
  let parser = new RSSParser();
  const response = await parser.parseURL(CORS_PROXY + url)
  console.log('RESPONSE', response)
  return response
}

export const fetchProgressStorage = async (title) => {
  console.log('FETCH_STORAGE')
  try {
  const value = await localStorage.getItem((JSON.stringify(`${title}_progress`)));
  if (value !== null) {
    // We have data!!
    // setEpisodeProgress(JSON.parse(value));
    return JSON.parse(value);
  } else {
    return 0
  }
} catch (error) {
  console.log("ERROR", error)
  return 0
  // Error retrieving data
}
}

export const fetchEpisodeProgressStorage = async (title) => {
  try {
  const value = await localStorage.getItem((JSON.stringify(`${title}_progress`)));
  if (value !== null) {
    // We have data!!
    // setEpisodeProgress(JSON.parse(value));
    return JSON.parse(value);
  } else {
    return 0
  }
} catch (error) {
  console.log("ERROR", error)
  return 0
  // Error retrieving data
}
}

export const updateStatus = async (title, status) => {
  try {
    await localStorage.setItem(JSON.stringify(`${title}_progress`), JSON.stringify(status.positionMillis));
  } catch (e) {
    // console.log('CANNOT_SAVE_PROGRESS', e)
    // saving error
  }
  // setSoundDuration(status.durationMillis);
  // setSoundProgress(status.positionMillis);
};
// export const GetMp3Duration = async (url) => {
//   const { sound } = await Audio.Sound.createAsync({
//     uri: url,
//   });
//   const status = await sound.getStatusAsync()
//   await sound.unloadAsync();

//   return status.durationMillis;
// }






// PAN EXAMPLE
//  const [panX, setPanX ] = useState(0)
//   const [panXOnRelease, setPanXOnRelease] = useState(0)

//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         pan.setOffset({
//           x: pan.x._value,
//           y: pan.y._value,
//         });
//       },
//       // onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {useNativeDriver: false}),
//        onPanResponderMove: (e, gestureState) => {setPanX(gestureState.dx), Animated.event([null, { dx: pan.x, dy: pan.y }], {useNativeDriver: false})},
//       onPanResponderRelease: (e, gestureState) => {
//         setPanXOnRelease(gestureState.dx);
//         pan.flattenOffset();
//       },
//     })
//   ).current;
  
//   useEffect(() => {
//     // dispatch(OpenRssPlayer({data: {episode: {...episode}, podcast: {...podcast}}, state: true}))
//     console.log(panXOnRelease);
//     if(panXOnRelease > 150) {
//       setPanXOnRelease(400);
//       setPlaying(false);
//       setRunningEpisode(false)
//       stopSound()
//     } else {
//       setPanX(0)
//     }
//   }, [panXOnRelease]);
  
  // useEffect(() => {
  //   console.log(pan);
  // }, [pan])
  // console.log(panXOnRelease)