import React from 'react';
import styled from 'styled-components';

const StyledWheelchairButton = styled.button`
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  color: rgba(255,255,255,0.9);
  background-color: rgba(30,30,30,0.3);
  height: 40px;
  width: 40px;
  cursor: pointer;
  border: 1px solid white;
  
  @media (max-width: 1024px) {
  font-size: 16px;
  height: 32px;
  width: 32px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    height: 24px;
    width: 24px;
  }
`;

const WheelchairButton = ({ children, onClick, color }) => (

  <StyledWheelchairButton
    onClick={onClick}
    style={{'background-color': color}}
  >
    {children}
  </StyledWheelchairButton>
)

export default WheelchairButton;