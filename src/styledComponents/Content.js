import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
  font-size: 14px;
  grid-area: c;
  padding: 10px;
  display: grid;
  font-family: "Roboto", sans-serif;
  color: #000;
  height: 100vh;
  grid-template-rows: 600px auto;
  grid-template-areas: 
    "m"
    "w";
`;

const Content = ({ children }) => (
  <StyledContent > {children} </StyledContent>
)

export default Content;