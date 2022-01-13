import Link from 'next/link';
import React from 'react';
// import styled from 'styled-components';
import Button from './Button';
import { styled } from '../../stitches.config';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { SignOutUser } from '../actions';

const Wrapper = styled('div', {
  top: '0',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  right: '0',
  position: 'sticky',
  padding: '2.4rem 0rem',
  flexShrink: '1',
});

const NotificationWrapper = styled('div', {
  backgroundColor: '#424242',
  width: '5.6rem',
  height: '5.6rem',
  borderRadius: '1rem',
  marginRight: '3.2rem',
});

const ProfileDropdownWrapper = styled(DropdownMenu.Trigger, {
  border: '1px solid #E0E0E0',
  borderRadius: '0.8rem',
  fontWeight: '500',
  padding: '1.2rem',
  backgroundColor: '#F1F1F1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  'img': {
    borderRadius: '100%',
  },

  'span': {
    marginLeft: '1.2rem',
    color: '#333',
    fontSize: '1.6rem',
  },
    
  '&:hover': {
    backgroundColor: '#fff',  
  }
});

const NavItem = styled('span', {
  fontSize: '1.6rem',
  fontWeight: '400',
  marginRight: '2.4rem',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  }
});

const Logo = styled('span', {
  fontSize: '1.8rem',
  fontWeight: '400',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  }
});

const NavItems = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const StyledContent = styled(DropdownMenu.Content, {
  minWidth: '16rem',
  backgroundColor: 'white',
  borderRadius: '0.6rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '0.4rem',
});

const DropdownItem = styled(DropdownMenu.Item, {
  fontSize: '1.4rem',
  fontWeight: '400',
  borderRadius: '0.4rem',
  padding: '0.4rem 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  
  'svg': {
    width: 'auto',
    height: '2rem',
    paddingRight: '0.8rem',
    fill: '#000',
    'path': {
      fill: '#000',
    }
  },

  '&:focus-visible': {
    outline: 0,
  },

  '&:hover': {
    backgroundColor: '$primary',
    'div, svg, path': {
      color: '#fff',
      fill: '#fff',
    }
  }
})

const StyledLabel = styled(DropdownMenu.Label, {
  paddingLeft: '0.8rem',
  fontSize: '1.4rem',
  color: '#000',
});

const DropdownRoot = styled(DropdownMenu.Root, {
  padding: 0,
  margin: 0
})

const NotificationIndicator = () => (
  <NotificationWrapper>
    
  </NotificationWrapper>
);

const ProfileDropdown = ({userName, image, signOut, setProfileDialogOpen}: {userName: string, image?: string, signOut?: any, setProfileDialogOpen?: any}) => (
   <DropdownRoot>
    <ProfileDropdownWrapper>
      {image !== undefined && image !== false && <Image src={image} width={36} height={36} alt='profile' />}
      <span>{userName}</span>
    </ProfileDropdownWrapper>

    <StyledContent>
      <DropdownItem onClick={() => setProfileDialogOpen(true)}>
        <StyledLabel>Edit Profile</StyledLabel>
        <CaretRightIcon />
      </DropdownItem>
      <DropdownItem onClick={() => signOut()}>
        <StyledLabel>Logout</StyledLabel>
        <CaretRightIcon />
      </DropdownItem>

    </StyledContent>
  </DropdownRoot>
)

const TopNav = ({userLoggedIn, userData, setProfileDialogOpen }: {userLoggedIn?: boolean, userData?: any, setProfileDialogOpen?: any}) => {
    const dispatch = useDispatch();
  return (
    <Wrapper>
      {/* <SearchInput placeholder='Search' /> */}
      <Link href='/' passHref><Logo>Radionight</Logo></Link>
      {userLoggedIn && userData !== undefined ? <><NavItems>
        <NavItem>Latest Episodes</NavItem>
        <Link href='/' passHref><NavItem>Your Podcasts</NavItem></Link>
        <NavItem>Help</NavItem>
      </NavItems>
      <ProfileDropdown userName={userData.user_name} image={userData.user_image} signOut={() => {dispatch(SignOutUser())}} setProfileDialogOpen={setProfileDialogOpen}  /></>: <div style={{display:'flex', flexDirection:'row'}}><Link href='/login' passHref><Button style={{marginRight: '1.2rem'}}>Login</Button></Link><Link href='/signup' passHref><Button>Signup</Button></Link></div>}
    </Wrapper>
  )
}

export default TopNav;