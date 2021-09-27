import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3.2rem;
`

const Title = styled.span`
  font-size: 3.2rem;
  font-weight: 500;
`

const SeeMoreButton = styled.span`
  font-size: 2rem;
  font-weight: 400;
  padding-bottom: 2px;
  border-bottom: 1px solid var(--white);
`
const SectionHeader = ({title, seeMore} : {title: string, seeMore: any}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <SeeMoreButton>See More</SeeMoreButton>
    </Wrapper>   
  )
}

SectionHeader.defaultProps = {seeMore: 'See More', title: 'Premieres'}

export default SectionHeader;