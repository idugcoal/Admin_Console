import React from 'react';
import styled from 'styled-components';

const StyledFunctionButton = styled.button`
  font-size: 24px;
  font-family: "Roboto", sans-serif;
  color: #FFF;
  background-color: rgba(60,60,60,0.5);
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  background-color: rgba(60,60,60,0.5);
  box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
  height: 48px;
  width: 300px;
  cursor: pointer;
  :active { 
    background-color: rgba(30,30,30,0.3);
  }

  @media (max-width: 1024px) {
  font-size: 16px;
  line-height: 16px;
  height: 48px;
  width: 200px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
    height: 32px;
    width: 100px;
  }
`;

const FunctionButton = ({ children, onClick }) => (
  <StyledFunctionButton
    onClick={onClick}
  >
    {children}
  </StyledFunctionButton>
)

export default FunctionButton;