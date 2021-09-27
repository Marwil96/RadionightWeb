import React from 'react';
import { useState } from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  /* padding: 0 16px; */
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--secondary);
  border-radius: 6px;
`

const ToggleItem = styled.button`
  width: ${props => `${100 / props.amountOfItems}%`};
  background-color: ${props => props.focussed ? `var(--primary)` : `var(--secondary)`};
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  border: none;

  &:first-child {
    border-radius: 6px 0 0 6px;
  }

  &:last-child {
    border-radius: 0px 6px 6px 0px;
  }

  &:hover {
    background-color: ${props => props.focussed ?  `var(--primary)` : "#5A5C60"};
  }
`

const ToggleItemText = styled.span`
  font-size: 16px;
  font-family: 'Manrope_400Regular';
  color: var(--white);
`

const ToggleBar = ({items, onChange, style} : {items: any, onChange: any, style: any}) => {
  const [selected, setSelected] = useState(0)
  
  return (
    <Wrapper style={style}>
      <Content>
        {items.map((title : string, index: any) => <ToggleItem key={index} amountOfItems={items.length} focussed={selected === index} onClick={() => {setSelected(index), onChange(title)}}><ToggleItemText>{title}</ToggleItemText></ToggleItem> )}
      </Content>
    </Wrapper>
  );
};

export default ToggleBar;