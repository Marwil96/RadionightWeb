import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

import {LoginUser, SignOutUser} from '../actions/auth';
import { FetchAllUserData } from '../actions/database'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.AuthReducer);
  const { user_data } = useSelector((state) => state.DatabaseReducer);

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
    </Layout>
  )
}

export default Home
