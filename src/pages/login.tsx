import React, { useEffect } from "react";
import Layout from '../components/Layout'
import { useRouter } from "next/dist/client/router";
import { NextPage } from "next";
import Button from "../components/Button";
import Link from "next/link";
import { styled } from '../../stitches.config';
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../actions";

const LoginWrapper = styled('div', {
  display: 'flex',
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '50rem',
  width: '100%'
})

const Wrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justityContent: 'center',
  alignItems: 'center',
})

const Title = styled('h1', {
  fontSize: '3.2rem',
  fontWeight: '500',
  marginBottom: '2.4rem',
})



const Login: NextPage  = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    const { userLoggedIn } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(email, password)
  }, [password, email])

  useEffect(() => {
    if (userLoggedIn ) {
      router.push('/')
    }
  }, [userLoggedIn])

  return (
    <Layout>
      <Wrapper>
        <LoginWrapper>
          <Title>Login</Title>
          <Input css={{marginBottom: '0.8rem'}} fullWidth placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <Input css={{marginBottom: '1.6rem'}} fullWidth placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <Button css={{marginBottom: '0.8rem'}} color='primary' size='medium' fullWidth onClick={() => { dispatch(LoginUser({ email: 'william_martinsson@hotmail.com', password: 'Wille14' }))}}>Login</Button>
          <Link href='/signup' passHref><Button css={{marginBottom: '0.8rem'}} fullWidth>Signup</Button></Link>
        </LoginWrapper>
      </Wrapper>
    </Layout>
  );
};

export default Login;
