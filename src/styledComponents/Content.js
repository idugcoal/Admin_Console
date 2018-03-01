import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
  font-size: 14px;
  grid-area: ". buttons . map .";
  padding: 10px;
  font-family: "Roboto", sans-serif;
  color: #000;
`;

const Content = ({ children }) => (
  <StyledContent > {children} </StyledContent>
)

export default Content;