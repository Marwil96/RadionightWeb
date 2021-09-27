import { CREATE_USER, LOGIN_USER, SIGN_OUT_USER, UPDATE_USER_STATUS } from "./constables";
import { Dispatch } from 'redux';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../firebaseConfig";
// import { FetchAllUserData } from "./database";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
let user = getAuth();


export const LoginUser = ({ email, password } : {email: string, password: string}) => {
  return (dispatch: Dispatch) => {
    signInWithEmailAndPassword(user, email, password).then(() => {
      // dispatch(FetchAllUserData());
      dispatch({
        type: LOGIN_USER,
        payload: { userLoggedIn: true },
      });
    }).catch(error => {
      console.log(error)
      dispatch({
        type: LOGIN_USER,
        payload: { userLoggedIn: false },
      });
    })
  }
};

export const SignOutUser = () => {
  // if (isFunction(unsubscribeProfileData)) unsubscribeProfileData();
  // if (isFunction(unsubscribeCollections)) unsubscribeCollections();
  // if (isFunction(unsubscribeRecipeCollections)) unsubscribeRecipeCollections();
  // if (isFunction(unsubscribeCollectionRecipes)) unsubscribeCollectionRecipes();
  // if (isFunction(unsubscribePersonalRecipes)) unsubscribePersonalRecipes();
  // if (isFunction(unsubscribeAllRecipes)) unsubscribeAllRecipes();
  // if (isFunction(unsubscribeAllCollections)) unsubscribeAllCollections();
  // if (isFunction(unsubscribeRecipes)) unsubscribeRecipes();
  // if (isFunction(unsubscribeFetchPlan)) unsubscribeFetchPlan();
  return (dispatch: Dispatch) => {
    signOut(user)
      .then((response) => {
        dispatch({ type: SIGN_OUT_USER, payload: { userLoggedIn: false } });
      })
      .catch((error) => {
        dispatch({ type: SIGN_OUT_USER, payload: { error: true } });
      });
  };
};

export const UpdateUserStatus = () => {
  return (dispatch: Dispatch) => {
    onAuthStateChanged(user, (user) => {
      if (user) {
        dispatch({
          type: UPDATE_USER_STATUS,
          payload: { userLoggedIn: true, user_id: user.uid },
        });
      } else {
        dispatch({
          type: UPDATE_USER_STATUS,
          payload: { userLoggedIn: false },
        });
      }
    });
  };
};

export const SignUpUser = ({ email, password, userName }) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: CREATE_USER, payload: { loading: true, error: null } });

    createUserWithEmailAndPassword(user,email, password)
      .then(async (response) => {
        const dataSet = await db
          .collection("users")
          .doc(response.user.uid)
          .set({
            email: email,
            user_id: response.user.uid,
            verified_email: false,
            first_time: true,
            user_name: userName,
            mods: [response.user.uid],
            invited_to_mod: [],
            followed_podcasts: [],
            owned_podcasts: [],
            user_image: false,
            banned_users: [],
          });

        dispatch({
          type: CREATE_USER,
          payload: { userLoggedIn: true, loading: false },
        });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({
          type: CREATE_USER,
          payload: { error, userLoggedIn: false },
        });
      });
  };
};


