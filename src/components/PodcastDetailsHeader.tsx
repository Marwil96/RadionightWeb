import { useRouter } from "next/dist/client/router";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  justify-content: center;
`;

const CoverArt = styled.img`
  height: 80px;
  width: 80px;
  margin-bottom: 1.6rem;
  border-radius: 4px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 1;
`;
const Title = styled.span`
  font-size: 3.2rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${props => props.textColor};
  flex-shrink: 1;
  text-align: center;
`;
const Subtitle = styled.span`
  font-size: 16px;
  color: ${props => props.textColor};
  max-width: 300px;
  text-align: center;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ReadMore = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-family: "Manrope_700Bold";
  cursor: pointer;

  &:hover {
    color: var(--primary);
  }
`;


const PodcastDetailsHeader = ({
  onClick,
  title,
  image,
  subtitle,
  desc,
  style,
  isFollowed,
  bgColor,
  textColor,
  onButtonClick,
  categories,
  official
} : {
  onClick?: any,
  title?: string,
  image?: any,
  subtitle?: string,
  desc?: string,
  style?: any,
  isFollowed?: boolean,
  bgColor?: string
  textColor?: string,
  onButtonClick?: any,
  categories?: any,
  official?: boolean
}) => {
  const [followingPodcast, setFollowingPodcast] = useState(isFollowed);
  const [descLimit, setDescLimit] = useState(250);
  const router = useRouter();

  return (
    <Wrapper onClick={onClick} style={style} bgColor={bgColor} textColor={textColor}>
      <Content>
        <CardHeader>
          <CoverArt src={ image } />
          <TitleContainer>
            <Title textColor={textColor}>{title}</Title>
            {official  ? <Subtitle>Official</Subtitle> : <Subtitle textColor={textColor}>Community Managed</Subtitle>}
          </TitleContainer>
        </CardHeader>
        <span style={{ fontSize: '1.6rem', marginBottom: 32, color:textColor, maxWidth: 600, lineHeight:'2.5rem', textAlign: 'center' }}>{desc.slice(0, descLimit)}{descLimit < 251 && desc.length > 250 && '...'}  { desc.length > 250 ? descLimit < 251 ? <ReadMore onClick={() => setDescLimit(10000)}>Read More</ReadMore> :  <ReadMore onClick={() => setDescLimit(250)}>Read Less</ReadMore> : '' } </span>
        
        <BottomRow>
          <Button
            style={{marginRight: '1.6rem'}}
            // borderMode={followingPodcast}
            color='primary'
          >
            Start Premiere
          </Button>
          <Button>
            Edit Podcast
          </Button>
          
        </BottomRow>
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            paddingLeft: 0,
            paddingRight: 16,
            marginBottom: 6,
            paddingTop: 16
          }}>
          {/* {categories.map((category: any, index: any) => <CategoryTag key={index} onClick={() =>  navigation.navigate("DiscoverStack", { screen: 'Discover', params:{filter: category}})}>{category}</CategoryTag>)} */}
        </div >
      </Content>
    </Wrapper>
  );
};

export default PodcastDetailsHeader;
