import { CREATE_USER, LOGIN_USER, SIGN_OUT_USER, CREATE_PODCAST, FETCH_ALL_USER_DATA, FETCH_EPISODE, GET_CHAT_MESSAGES} from "./constables";
import { Dispatch } from "redux";
import { firebaseConfig } from "../../firebaseConfig";
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, doc, setDoc, onSnapshot, getDoc, arrayRemove, arrayUnion, query, getDocs, where, deleteDoc } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const user = getAuth();
const storage = getStorage(app);

const getTimeEpoch = () => {
  return new Date().getTime().toString();
};


export const FetchAllUserData = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: FETCH_ALL_USER_DATA, payload: {loading: true}})
    onSnapshot(doc(db, 'users', user.currentUser.uid), (doc) => {
        const data = doc.data();

        dispatch({type: FETCH_ALL_USER_DATA, payload: {loading: false, user_data: data }})
      }
    )}
}

export const FetchUserData = async (userId: string) => {
  const response = await getDoc(doc(db, 'user', userId));
  const data = response.data();

  return data
  }

export const FetchPodcastData= async (podcastId: string) => {
  console.log('FETCHPODCASTDATA', podcastId)
  const response = await getDoc(doc(db, "podcasts", podcastId));
  const data = response.data();
  
  console.log('DATA', data)
  return data
}

export const UpdateUserData = async ({ data } : object) => {
  const url = data.user_image !== undefined && data.user_image !== false ? await UploadImage({file:data.user_image, userId: user.currentUser.uid, fileName:'profile_image'}) : false;
  console.log('URL', url)
   const response = await setDoc(doc(db, 'users', user.currentUser.uid), {...data, user_image: url}, {merge: true}).then(() => { 
    return true
   }).catch((error) => false);

   return response
}

export const SchedulePodcastPremiere = async (data : object) => {
  const episodeId = getTimeEpoch();
  const result = setDoc(doc(db, 'scheduled_episodes', episodeId), {...data, episode_id:episodeId }).then(() => { 
      return true
    }).catch((error) => {
      return false
    })
  
  return result
}

export const AddEpisodePremiere = async (data : object) => {
  const episodeId = getTimeEpoch();
  const result = await setDoc(doc(db, 'episodes', episodeId), {...data, episode_id:episodeId }).then(() => { 
      return {success: true, episodeId: episodeId}
    }).catch((error) => {
      return {success: false, episodeId: false}
    })
  
  return result
}

export const FetchBannedUsers = async (bannedUsers: any) => {
  const result = await Promise.all(
    await bannedUsers.map(async (id : string) => {
      const response = await getDoc(doc(db, "users", id)).then((doc) => {
        const data = doc.data();

        return data
      })

      return response
    })
  )

  return result;
}

export const RemoveUserFromBanList = async (invitationData: any) => {
  const response = await setDoc(doc(db, invitationData.collection, invitationData.podcast_id), {banned_users: arrayRemove(invitationData.user_id)}, {merge: true}).then(()  => {
    return true
  }).catch((error) => false);

  return response;
}

export const AddUserToBanList = async (invitationData: any) => {
  const response = await setDoc(doc(db, invitationData.collection, invitationData.podcast_id), {banned_users: arrayUnion(invitationData.user_id)}, {merge: true}).then(()  => {
    return true
  }).catch((error) => false);

  return response;
}


export const FetchAllFollowers = async (podcastId: string) => {
  const allFollowers = await getDocs(query(collection(db, 'users'), where("followed_podcasts", "array-contains", podcastId))).then((querySnapshot) => {
    const followers = [];
     querySnapshot.forEach((doc) => { 
       followers.push(doc.data())
     })
     return followers
  })

  return allFollowers;
}

export const FetchMods = async (mods: any) => {
  const result = await Promise.all(
    await mods.map(async (id: string) => {
      const response = await getDoc(doc(db, 'users', id)).then((doc) => {
        const data = doc.data();

        return data
      })

      return response
    })
  )

  return result;
}

export const RemoveAsMod = async (invitationData: any) => {
  const response = await setDoc(doc(db, invitationData.collection, invitationData.podcast_id ), { mods: arrayRemove(invitationData.user_id)}, { merge: true }).then(() => {
      return true;
    })
    .catch((error) => false);

  return response;
};

export const AcceptInvitationToMod = async ({official_broadcast, collection, podcast_title, podcast_id } : {official_broadcast: any, collection: any, podcast_title: string, podcast_id: string}) => {
  const response = await setDoc(doc(db, collection, podcast_id),{mods: arrayUnion(user.currentUser.uid)},{merge: true}).then(()  => {
    return true
  }).catch((error) => false);

  if(response) {
    await setDoc(doc(db, 'users', user.currentUser.uid), {invited_to_mod: arrayRemove({official_broadcast, podcast_title, podcast_id})}, {merge: true} )
    return true
  } else {
    return false
  }
}

export const DeclineInvitationToMod = async ({official_broadcast, collection, podcast_title, podcast_id } : {official_broadcast: any, collection: any, podcast_title: string, podcast_id: string}) => {
  const response = await setDoc(doc(db, 'users', user.currentUser.uid), {invited_to_mod: arrayRemove({official_broadcast, podcast_title, podcast_id})}, {merge: true}).then(()  => {
    return true
  }).catch((error) => false);

  return response
}

export const InviteUserToMod = async ({userName, podcastId, podcastTitle, officialBroadcast}:  {officialBroadcast: any, podcastId: string, podcastTitle: string, userName: string}) => {
  console.log(userName, podcastId, podcastTitle, officialBroadcast)
  
  const userId = await getDocs(query(collection(db, 'users'), where("user_name", "==", userName))).then((querySnapshot) => {
    const users = [];
     querySnapshot.forEach((doc) => { 
       users.push(doc.data())
     })

     return users
  })

  if(userId.length > 0) {
    const response = await setDoc(doc(db, 'users', userId[0].user_id), {invited_to_mod: arrayUnion({podcast_title: podcastTitle, podcast_id: podcastId, official_broadcast: officialBroadcast})}, { merge: true }).then(()  => {
      return true
    }).catch((error) => false);
    return response
  } else {
    return false
  }

  return response
}

export const AddChatMessage = async ({isMod, message, episodeId, messageAuthor} : {isMod: any, message: string, episodeId: string, messageAuthor: any}) => {
  const chatId = getTimeEpoch();

  const result = await setDoc(doc(db, `episodes/${episodeId}/chat/${chatId}`), {isMod, message, message_author: messageAuthor, chat_id:chatId, time_stamp: chatId }).then(() => { 
      return true
    }).catch((error) => {
      return false
    })
    
  return result
}

export const RemoveChatMessage = async ({episodeId, messageId} : {episodeId: string, messageId: string}) => {

  const result = await deleteDoc(doc(db, `episodes/${episodeId}/chat/${messageId}`)).then(() => { 
      return true
    }).catch((error) => {
      return false
    })
    
  return result
}

export const GetChatMessages = ({ episodeId } : {episodeId: string}) => {
  console.log('GETCHATMESSAGE', episodeId )

  return (dispatch: Dispatch) => {
    dispatch({type: GET_CHAT_MESSAGES, payload: {loading: true, chat_messages: []}})
    onSnapshot(collection(db, `episodes/${episodeId}/chat`), (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });

      console.log(messages)

      dispatch({type: GET_CHAT_MESSAGES, payload: {loading: false, chat_messages: messages }})
    })
  }
}

export const GetPodcastPremieres = async (id : string) => {
  const result = await getDocs(query(collection(db, 'episodes'), where("podcast_id", "==", id))).then((querySnapshot) => {
      const upcomingEpisodes = [];
      const pastEpisodes = [];
      const liveEpisodes = [];
      
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const currentDate = new Date();
            const episodeGoesLive = new Date(data.start_date);
            const episodeIsDone = new Date(data.start_date).setSeconds(episodeGoesLive.getSeconds() + data.duratation);
   
              if(currentDate > episodeIsDone) {
                pastEpisodes.push({ ...data, episode_state: 'past' });
                // return 'past'
              } else if(currentDate > episodeGoesLive && currentDate < episodeIsDone) {
                liveEpisodes.push({ ...data, episode_state: 'live' });
                // return 'live'
              } else {
                upcomingEpisodes.push({...data, episode_state: 'upcoming'});
                // return 'upcoming'
              }

            // const theEpisodeState = episodeState();
            // episodes.push({...data, episode_state: theEpisodeState});
        });
        return [upcomingEpisodes, pastEpisodes, liveEpisodes];
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })

  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2], allEpisode: [...result[0], ...result[1], ...result[2]]}
}

export const FetchYourPodcasts = async (podcast_ids: any) => {
  const result = await Promise.all(
  await podcast_ids.map(async (id : string) => {
    const response = await getDoc(doc(db, 'podcasts', id)).then((doc) => {
      const data = doc.data();

      return data
    })


    return response
  })
  )

  return result;
}

export const UpdatePodcastDetails = async ({data, podcastId} : {data: any, podcastId: string}) => {
   const response = await setDoc(doc(db, 'podcasts', podcastId), {...data}, {merge: true}).then(() => { 
    return true
   }).catch((error) => false);

   return response;
}

export const FetchEpisode = (episodeId : string) => {
  return(dispatch: Dispatch) => {
    dispatch({
      type: FETCH_EPISODE,
      payload: { data: {}, loading: true },
    });
    onSnapshot(doc(db, 'episodes', episodeId), (doc) => {
      const data = doc.data();

      dispatch({
        type: FETCH_EPISODE,
        payload: { data: data, loading: false },
      });
    });
  }
}


export const CheckIfRSSFeedIsInUse = async (rss_feed : any) => {
  const result = await getDocs(collection(db, 'podcasts'))
      .then((querySnapshot) => {
        const podcasts = [];
        let rssFeedExists = false;
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
          if(rss_feed === data.rss_url) {
            rssFeedExists = true;
            podcasts.push(data);
          }
        });

        return {rssFeedExists: rssFeedExists, podcastData: podcasts[0]};
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        return false;
      })

  console.log(result)
  return result;
}


export const CreatePodcast = ({ title, description, image, authors, categories, lang, rss_url, official, itunes, explicit} : { title: string, description: string, image: any, authors: any, categories: any, lang: any, rss_url: string, official: boolean, itunes: any, explicit: any}) => {
  const podcastId = getTimeEpoch();

  return (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_PODCAST,
      payload: { loading: true, podcast_created: true },
    });

    setDoc(doc(db, 'podcasts', podcastId), {
      title: title,
      desc: description,
      image: image.url,
      authors: authors,
      explicit: explicit === 'yes' ? true : false,
      categories: categories,
      lang: lang,
      id: podcastId,
      mods: official ? [user.currentUser.uid] : [],
      banned_users: [],
      owner: official ? user.currentUser.uid : false,
      rss_url: rss_url,
      verified_ownership: false,
      official: official,
      official_email: itunes.owner.email,
      // episodes: allEpisodes
    })
      .then(() => {
        if(official) {
          setDoc(doc(db, 'users', user.currentUser.uid), {
            owned_podcasts: firebase.firestore.FieldValue.arrayUnion(podcastId),
            followed_podcasts: firebase.firestore.FieldValue.arrayUnion(podcastId),
          },
          { merge: true })
        } else {
          setDoc(doc(db, 'users', user.currentUser.uid), {
            followed_podcasts: firebase.firestore.FieldValue.arrayUnion(podcastId),
          },
          { merge: true })
        }

        if (official) {
          var formdata = new FormData();
          formdata.append("podcast_id", podcastId);
          formdata.append("email", data.itunes.owner.email);
          // formdata.append("email", "william_martinsson@hotmail.com");
          formdata.append("podcast_name", title);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };

          fetch(
            "http://radionight.receptsamlingen.website/sendmail",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        }

        dispatch({
          type: CREATE_PODCAST,
          payload: { loading: false, podcast_created: true },
        });
      });
  };
};

export const AddOwnershipToPodcast = ({ title, description, image, authors, categories, rss_url, official, itunes, podcast_id} : { title: string, description: string, image: any, authors: any, categories: any, rss_url: string, official: any, itunes: any, podcast_id: string}) => {

  return (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_PODCAST,
      payload: { loading: true, podcast_created: true },
    });

    setDoc(doc(db, 'podcasts', podcast_id), {
      title: title,
      desc: description,
      image: image.url,
      authors: authors,
      categories: categories,
      id: podcast_id,
      mods: official ? [user.currentUser.uid] : [],
      banned_users: [],
      owner: official ? user.currentUser.uid : false,
      rss_url: rss_url,
      verified_ownership: false,
      official: official,
      official_email: itunes.owner.email,
      // episodes: allEpisodes
    }).then(() => {
        if(official) {
          setDoc(doc(db, 'users', user.currentUser.uid), {
            owned_podcasts:
              arrayUnion(podcast_id),
          },
          { merge: true })
        }

        if (official) {
          var formdata = new FormData();
          formdata.append("podcast_id", podcast_id);
          formdata.append("email", itunes.owner.email);
          // formdata.append("email", "william_martinsson@hotmail.com");
          formdata.append("podcast_name", title);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };

          fetch(
            "http://radionight.receptsamlingen.website/sendmail",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        }

        dispatch({
          type: CREATE_PODCAST,
          payload: { loading: false, podcast_created: true },
        });
      });
  };
};

export const StartFollowingPodcast = (podcastId : string) => {
  setDoc(doc(db, 'users', user.currentUser.uid), {followed_podcasts: arrayUnion(podcastId)}, {merge: true});
}

export const StopFollowingPodcast = (podcastId: string) => {
  setDoc(doc(db, 'users', user.currentUser.uid), {followed_podcasts: arrayRemove(podcastId)}, {merge: true});
}


export const GetAllPodcasts = async (filter: any) => {
  const {languages} = await getDoc(doc(db, 'users', user.currentUser.uid)).then((doc) => doc.data())
  const result =
    filter !== false && filter !== undefined ? 
      await getDocs(query(collection(db, 'users'), where("categories", "array-contains", filter)))
        .then((querySnapshot) => {
          const podcasts = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            if(data.lang === undefined || languages.includes(data.lang)) {
              podcasts.push(data);
            }
            });

          return podcasts;
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          return false;
        })
        
      : 
        await getDocs(collection(db, 'podcasts'))
          .then((querySnapshot) => {
            const podcasts = [];

            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              const data = doc.data();
              if(data.lang === undefined || languages.includes(data.lang)){
                podcasts.push(data);
              };
            });

            return podcasts;
          })
          .catch((error) => {
            console.log("Error getting document:", error);
            return false;
          });
  return result
};

export const FetchYourCommunityPremieres = async () => {
  const result = await Promise.all(
    await getDocs(query(collection(db, 'episodes'), where("owner", "==", user.currentUser.uid))).then((querySnapshot) => {
      const upcomingEpisodes = [];
      const pastEpisodes = [];
      const liveEpisodes = [];

      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
            if(data.episode_ended === true) {
              pastEpisodes.push({ ...data, episode_state: 'past' });
              // return 'past'
            } else if (data.stream_started.state === true) {
              liveEpisodes.push({ ...data, episode_state: "live" });
              // return 'live'
            } else {
              upcomingEpisodes.push({ ...data, episode_state: "upcoming" });
              // return 'upcoming'
            }
      });
      return [upcomingEpisodes, pastEpisodes, liveEpisodes];
    
   })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
  )
  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2]}
}

export const GetFollowedPremieres = async (followed_podcasts : any) => {
  const result = await Promise.all(
    await getDocs(query(collection(db, 'episodes'), where("podcast_id", "in", followed_podcasts)))
    .then((querySnapshot) => {
      const upcomingEpisodes = [];
      const pastEpisodes = [];
      const liveEpisodes = [];
      const liveOfficialEpisodes = [];
      const liveCommunityEpisodes = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();

              if(data.episode_ended === true && data.official === true) {
                pastEpisodes.push({ ...data, episode_state: 'past' });
                // return 'past'
              } else if (data.stream_started.state === true && data.episode_ended !== true) {
                liveEpisodes.push({ ...data, episode_state: "live" });
                if(data.official === true) {
                  liveOfficialEpisodes.push({ ...data, episode_state: "live", official: true });
                } else {
                  liveCommunityEpisodes.push({ ...data, episode_state: "live", official: false });
                }
                // return 'live'
              } else {
                if(data.official === true) {
                  upcomingEpisodes.push({ ...data, episode_state: "upcoming" });
                }
                // return 'upcoming'
              }

            // const theEpisodeState = episodeState();
            // episodes.push({...data, episode_state: theEpisodeState});
        });
        return [upcomingEpisodes, pastEpisodes, liveEpisodes, liveOfficialEpisodes, liveCommunityEpisodes];
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
  )
  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2], allEpisodes: [...result[0], ...result[1], ...result[2]], liveOfficialEpisodes: result[3], liveCommunityEpisodes: result[4]}
}

export const GetCurrentlyLiveEpisodes = async (followed_podcasts : any) => {
  
    const result = await getDocs(query(collection(db, 'episodes'), where("podcast_id", "not-in", followed_podcasts !== undefined ? followed_podcasts : ['3131231'])))
    .then((querySnapshot) => {
     const upcomingEpisodes = [];
      const pastEpisodes = [];
      const liveEpisodes = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const currentDate = new Date();
            const episodeGoesLive = new Date(data.start_date);
            const episodeIsDone = data.episode_done === true;
 
              if(episodeIsDone) {
                pastEpisodes.push({ ...data, episode_state: 'past' });
                // return 'past'
              } else if (data.stream_started.state === true && data.episode_ended !== true) {
                liveEpisodes.push({ ...data, episode_state: "live" });
                // return 'live'
              } else {
                upcomingEpisodes.push({ ...data, episode_state: "upcoming" });
                // return 'upcoming'
              }

            // const theEpisodeState = episodeState();
            // episodes.push({...data, episode_state: theEpisodeState});
        });
        return [upcomingEpisodes, pastEpisodes, liveEpisodes];
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })

  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2]}
}

export const DownloadImage = async (ref) => {
  // console.log(ref);
  // const storageRef = ref(storage,
  //   `gs://memorycollector-3e5de.appspot.com/${ref}`
  // );
  return getDownloadURL(ref(storage,
    `gs://memorycollector-3e5de.appspot.com/${ref}`
  )).then((url) => {
    return url;
  });
};



export const UploadImage = async ({
  file,
  fileName,
  userId,
}: {file: any, fileName: string, userId: string}) => {
  
  const response = await fetch(file);
  const blob = await response.blob();
  // dispatch({type: UPLOAD_IMAGE, payload: {ImageUploaded: false}})
  var uploadedImage = ref(storage, `${userId}/${fileName}.jpg`);

  await uploadBytes(uploadedImage, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });

  const downloadUrl =  await getDownloadURL(ref(storage, `${userId}/${fileName}.jpg`)).then((url) => { return url });

  return downloadUrl
};

export const UploadMp3File = async ({file, fileName} : {file: any, fileName: any}) => {
  const response = await fetch(file);
  const blob = await response.blob();
  // dispatch({type: UPLOAD_IMAGE, payload: {ImageUploaded: false}})
  var metadata = {
    contentType: "audio/mpeg",
  };
  
  // Upload the file and metadata
  var uploadTask = ref(storage, user.currentUser.uid).child(`${fileName}`);

  await uploadBytes(uploadTask, blob, metadata).then((snapshot) => {});

  return await getDownloadURL(ref(storage, user.currentUser.uid).child(`${fileName}`))
    .then((url) => {
      return url;
    });
};
