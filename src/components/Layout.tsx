import { useRouter } from 'next/router';
import React, { Children, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { UpdateUserStatus } from '../actions';
import ProfileDialog from './ProfileDialog';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0F0F10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.section`
  width: 100%;
  max-width: 120rem;
  padding: 3.2rem;
`

const MainContent = styled.main`
  /* width: calc(100% - 23.5rem); */
  min-height: 100vh;
`

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({children} : LayoutProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const { userLoggedIn } = useSelector((state) => state.AuthReducer);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  console.log(user_data?.length === 0)
  useEffect(() => {
    dispatch(UpdateUserStatus());
  }, []);
  
  
  return (
    <Wrapper>
      <Content>
        {/* <Sidebar /> */}
        <TopNav userLoggedIn={userLoggedIn} userData={user_data} setProfileDialogOpen={setProfileDialogOpen}/>
        <MainContent>
         {user_data !== undefined && <ProfileDialog userData={user_data} open={profileDialogOpen} close={() => setProfileDialogOpen(false)} />}
          {children}
        </MainContent>
      </Content>
    </Wrapper>
  )
}

export default Layout;