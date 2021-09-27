import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  /* padding: 0 16px; */
  margin-bottom: 16px;
  grid-column: span 4;
  background: none;
  cursor: pointer;

  &:hover {
    .content {
      background-color: #5A5C60;
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #303235;
  border-radius: 12px;
  padding: 12px;
  transition: ease 250ms all;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const CoverArt = styled.img`
  height: 64px;
  width: 64px;
  margin-right: 12px;
  border-radius: 4px;
  object-fit: cover;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;
const Title = styled.span`
  font-size: 16px;
  font-family: 'Manrope_500Medium';
  margin-bottom: 3px;
  color: var(--white);
  flex-shrink: 1;
`
const Subtitle = styled.span`
  font-size: 14px;
  font-family: "Manrope_400Regular";
  color: var(--white);
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const MetaItem = styled.span`
  font-size: 14px;
  font-family: "Manrope_500Medium";
  color: var(--white);
`;


const Desc = styled.span`
  font-size: 14px;
  font-family: "Manrope_400Regular";
  color: var(--white);
  word-break: break-word;
`;

const PlayButtonWrapper = styled.button`

`

const PodcastCard = ({onClick, title, image, subtitle, desc, meta1, meta2, style, playButton } : {onClick: any, title: string, image: any, subtitle: string, desc: string, meta1: string, meta2: string, style: any, playButton: any }) => {
  return (
    <Wrapper onClick={onClick} style={style}>
      <Content className='content'>
        <CardHeader>
          <CoverArt src={image} />
          <TitleContainer>
            <Title>{title.length > 40 ? `${title.slice(0, 40)}...` : title}</Title>
            {subtitle !== undefined && <Subtitle>{subtitle}</Subtitle>}
          </TitleContainer>
        </CardHeader>
        {desc !== undefined && <Desc style={{ fontSize: 14, marginBottom: 16 }}>{desc.length > 150 ? `${desc.slice(0, 150)}...` : desc}</Desc>}
         <BottomRow>
         { meta1 !== undefined && <MetaItem>{meta1}</MetaItem>}
         { meta2 !== undefined && <MetaItem>{meta2}</MetaItem> }
         {/* { playButton !== undefined && <PlayButtonWrapper onPress={playButton}><AntDesign name="play" size={24} color="white" /></PlayButtonWrapper> } */}
        </BottomRow>
      </Content>
    </Wrapper>
  );
}

export default PodcastCard;