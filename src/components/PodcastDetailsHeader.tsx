import { useRouter } from "next/dist/client/router";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
  /* padding: 0 16px; */
  /* margin-bottom: -12px; */
  /* background-color: ${props => props.bgColor}; */
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const CoverArt = styled.img`
  height: 67px;
  width: 67px;
  margin-right: 12px;
  border-radius: 4px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;
const Title = styled.span`
  font-size: 24px;
  font-family: "Manrope_500Medium";
  margin-bottom: 1px;
  color: ${props => props.textColor};
  flex-shrink: 1;
`;
const Subtitle = styled.span`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: ${props => props.textColor};
  max-width: 300px;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  onClick: any,
  title: string,
  image: any,
  subtitle: string,
  desc: string,
  style: any,
  isFollowed: boolean,
  bgColor: string
  textColor: string,
  onButtonClick: any,
  categories: any,
  official: boolean
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
        <span style={{ fontSize: '2.2rem', marginBottom: 16, color:textColor, maxWidth: 600, lineHeight:'140%' }}>{desc.slice(0, descLimit)}{descLimit < 251 && desc.length > 250 && '...'}  { desc.length > 250 ? descLimit < 251 ? <ReadMore onClick={() => setDescLimit(10000)}>Read More</ReadMore> :  <ReadMore onClick={() => setDescLimit(250)}>Read Less</ReadMore> : '' } </span>
        
        <BottomRow>
          <Button
            style={{ paddingTop: 10, paddingBottom: 10 }}
            // borderMode={followingPodcast}
            primary={!followingPodcast}
            onClick={() => {setFollowingPodcast(!followingPodcast), onButtonClick(!followingPodcast)}}
          >
            {followingPodcast ? "Following Podcast" : "Follow Podcast"}
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
