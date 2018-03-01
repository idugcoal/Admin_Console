import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  // @import url(https://fonts.googleapis.com/css?family=Roboto:300);
  display: grid;
  grid-template-columns: 10px 1fr 5px 1fr 10px;
  grid-template-rows: 50px auto;
  height: 100vh;
  max-height: 90%;
  grid-template-areas: 
    "header header header header header"
    ". buttons . map .";
    

`;

const Wrapper = ({ children }) => (
  <StyledWrapper > {children} </StyledWrapper>
)

export default Wrapper;