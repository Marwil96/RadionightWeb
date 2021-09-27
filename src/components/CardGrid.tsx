import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0rem;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-row-gap: 3.2rem;
  grid-column-gap: 3.2rem;
  margin-bottom: 2.4rem;
  /* max-width: var(--max-width); */
`

const CardGrid = ({children} : any) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default CardGrid;