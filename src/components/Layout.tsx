import React, { Children, ReactNode } from 'react';
import styled from 'styled-components';
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
`

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({children} : LayoutProps) => {
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