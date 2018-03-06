import React from 'react';
import styled from 'styled-components';

const StyledWheelchairButton = styled.button`
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  color: rgba(255,255,255,0.9);
  background: transparent;
  height: 40px;
  width: 40px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.6);
  margin: 1px;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
  
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
    style={{'color': color}}
  >
    {children}
  </StyledWheelchairButton>
)

export default WheelchairButton;