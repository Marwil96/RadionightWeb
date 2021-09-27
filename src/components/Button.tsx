import React from 'react';
import styled from "styled-components"

const Wrapper = styled.button`
  padding: 16px 10px;
  background-color: ${props => props.borderMode ? "#0F0F10" : props.primary ? "#FF6A00" : "#303235"};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: none;
  outline: none;
  box-shadow: none;
  border: ${props => props.borderMode ? '1px dashed #FFF' : 'none'}
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`

const ButtonText = styled.span`
  font-size: 16px;
  font-family: "Manrope_500Medium";
`;

const Button = ({children, primary, style, onClick, borderMode} : {children: any, primary: any, style: any, onClick: any, borderMode: any}) => {
  return (
    <Wrapper primary={primary} style={style} onClick={onClick} borderMode={borderMode}>
      <ButtonText borderMode={borderMode}>{children}</ButtonText>
    </Wrapper>
  );
}

export default Button;