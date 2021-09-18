import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: calc(100vw - 23.5rem);
  height: 9.4rem;
  background-color: #262626;
  top:0;
  right: 0;
  position: absolute;
  padding: 1.6rem 4.2rem;
  display: flex;
  flex-shrink: 1;
`

const SearchInput = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: 1.6rem 4.8rem;
  background-color: #303235;
  outline: none;
  border: 0;
  border-radius: 0.6rem;
  margin-right: 4.2rem;
  height: 5.6rem;
  flex: 1;
  color: var(--white);
`

const NotificationWrapper = styled.div`
  background-color: #424242;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 1rem;
  margin-right: 3.2rem;
`

const ProfileDropdownWrapper = styled.div`
  border: 1px solid #E0E0E0;
  border-radius: 10px;
   height: 5.6rem;
   font-size: 1.2rem;
   min-width: 23.7rem;
   display: flex;
   align-items: center;
   justify-content: center;
   color: var(--white);
`

const NotificationIndicator = () => (
  <NotificationWrapper>
    
  </NotificationWrapper>
);

const ProfileDropdown = () => (
  <ProfileDropdownWrapper>
    William Martinsson
  </ProfileDropdownWrapper>
)

const TopNav = () => {
  return (
    <Wrapper>
      <SearchInput placeholder='Search' />
      <NotificationIndicator />
      <ProfileDropdown />
    </Wrapper>
  )
}

export default TopNav;