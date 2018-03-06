import React from 'react';
import styled from 'styled-components';

const StyledWheelchairButton = styled.button`
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  color: #FFF;
  background-color: rgba(30,30,30,0.3);
  height: 40px;
  width: 40px;

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
  >
    {children}
  </StyledWheelchairButton>
)

export default WheelchairButton;