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
`

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`

const Sidebar = () => {
  return (
    <Wrapper>
      <Logo>Radionights</Logo>
    </Wrapper>
  )
}

export default Sidebar;