import React from 'react';
import styled from 'styled-components';

const StyledWheelchairButton = styled.button`
  font-size: 24px;
  font-family: "Roboto", sans-serif;
  color: #000;
  height: 40px;
  width: 40px;
  border-radius: 2px;

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

const WheelchairButton = ({ children, onClick }) => (
  <StyledWheelchairButton
    onClick={onClick}
  >
    {children}
  </StyledWheelchairButton>
)

export default WheelchairButton;