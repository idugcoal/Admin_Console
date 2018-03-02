import React from 'react';
import styled from 'styled-components';

const StyledWheelchairButton = styled.button`
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  color: #000;
  height: 48x;
  width: 48px;
  border-radius: 2px;

  @media (max-width: 768px) {
    font-size: 12px;
    height: 24px;
    width: 24px;
`;

const WheelchairButton = ({ children, onClick }) => (
  <StyledWheelchairButton
    onClick={onClick}
  >
    {children}
  </StyledWheelchairButton>
)

export default WheelchairButton;