import React, { Children, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { UpdateUserStatus } from '../actions';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0F0F10;
`

const MainContent = styled.main`
  margin-left: 23.5rem;
  width: calc(100% - 23.5rem);
  margin-top: 9.4rem;
  min-height: 100vh;
  padding: 4.8rem;
`

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({children} : LayoutProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UpdateUserStatus());
  }, []);
  
  return (
    <Wrapper>
      <Sidebar />
      <TopNav />
      <MainContent>
        {children}
      </MainContent>
    </Wrapper>
  )
}

export default Layout;