import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 23.5rem;
  height: 100vh;
  background-color: #1E1E1E;
  padding-left: 3.2rem;
  padding-top: 3.2rem;
  position: fixed;
  left: 0;
  top:0;
  display: flex;
  flex-direction: column;
`

const Logo = styled.a`
  font-size: 2rem;
  font-weight: 600;
  color: var(--white);
`

const Link = styled.a`
  font-size: 2.4rem;
  color: var(--white);
`

const Sidebar = () => {
  return (
    <Wrapper>
      <Logo href='/'>Radionights</Logo>
      <Link href='/following'>Following</Link>
    </Wrapper>
  )
}

export default Sidebar;