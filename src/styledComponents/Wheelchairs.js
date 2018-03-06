import React from 'react';
import styled from 'styled-components';

const StyledWheelchairs = styled.div`
  font-size: 14px;
  padding: 10px;
  font-family: "Roboto", sans-serif;
  color: #000;
  grid-area: w;
  display: flex;
  margin: 10px;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: stretch;

  @media (max-width: 768px) {
    margin: 0px;
    padding: 0px;
  }
`;

const Wheelchairs = ({ children }) => (
  <StyledWheelchairs > {children} </StyledWheelchairs>
)

export default Wheelchairs;