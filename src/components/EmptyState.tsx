import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  align-items: center;
`

const Image = styled.img`
  border-radius: 1000px;
  width: 189px;
  height: 189px;
  margin-bottom: 16px;
`

const Title = styled.span`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--white);
  text-align: center;
  font-family: "Manrope_500Medium";
`;

const Subtitle = styled.span`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 16px;
  color: var(--white);
  font-family: "Manrope_400Regular";
  text-align: center;
`;

const EmptyState = ({imageUrl, title, subtitle, buttonText, onPress} : {imageUrl: string, title: string, subtitle: string, buttonText: string, onPress: any}) => {
  return (
    <Wrapper>
      <Image src={imageUrl} alt='EmptyState Image' />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Button style={{width: '100%', paddingTop: 12, paddingBottom: 12}} primary onPress={onPress}>{buttonText}</Button>
    </Wrapper>
  )
}

export default EmptyState;