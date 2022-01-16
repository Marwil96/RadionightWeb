import React from 'react';
import { styled } from '../../stitches.config';

const Wrapper = styled('div', {
   /* padding: 0 16px; */
  marginBottom: '16px',
  gridColumn: 'span 4',
  background: 'none',
  cursor: 'pointer',

  variants: {
    type : {
      carousel: {
        // marginRight: '1.6rem',
          // gridColumn: 'span 12',
      }
    }
  },

  '&:hover': {
    '.content': {
      backgroundColor: '#5A5C60',
    }
  }
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#303235',
  borderRadius: '12px',
  padding: '12px',
  transition: 'ease 250ms all',
});


const CardHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '12px',
});

const CoverArt = styled('img', {
  height: '64px',
  width: '64px',
  marginRight: '12px',
  borderRadius: '4px',
  objectFit: 'cover',
});

const TitleContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 1,
});

const Title = styled('span', {
  fontSize: '16px',
  marginBottom: '3px',
  color: 'var(--white)',
  flexShrink: 1,
});

const Subtitle = styled('span', {
  fontSize: '14px',
  color: 'var(--white)',
});

const BottomRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const MetaItem = styled('span', {
  fontSize: '14px',
  color: 'var(--white)',
});


const Desc = styled('span', {
  fontSize: '14px',
  color: 'var(--white)',
  wordBreak: 'break-word',
});


const PodcastCard = ({onClick, title, image, subtitle, desc, meta1, meta2, style, playButton, type } : {onClick?: any, title?: string, image?: any, subtitle?: string, desc?: string, meta1?: string, meta2?: string, style?: any, playButton?: any, type?: any }) => {
  return (
    <Wrapper onClick={onClick} style={style} type={type}>
      <Content className='content'>
        <CardHeader>
          {image !== undefined && <CoverArt src={image} />}
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