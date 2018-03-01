import React from 'react';
import styled from 'styled-components';

const StyledWheelchairs = styled.div`
  font-size: 14px;
  padding: 10px;
  font-family: "Roboto", sans-serif;
  color: #000;
  grid-area: w;
  background-color: pink;
  display: flex;
`;

const Wheelchairs = ({ children }) => (
  <StyledWheelchairs > {children} </StyledWheelchairs>
)

export default Wheelchairs;