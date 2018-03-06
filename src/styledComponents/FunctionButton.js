import React from 'react';
import styled from 'styled-components';

const StyledFunctionButton = styled.button`
  font-size: 24px;
  font-family: "Roboto", sans-serif;
  color: #FFF;
  background-color: rgba(30,30,30,0.8);
  height: 48px;
  width: 300px;
  cursor: pointer;
  :active { 
    background-color: rgba(30,30,30,0.3);
  }

  @media (max-width: 1024px) {
  font-size: 20px;
  height: 48px;
  width: 200px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
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