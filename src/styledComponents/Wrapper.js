import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  // @import url(https://fonts.googleapis.com/css?family=Roboto:300);
  background-image: url("https://wallpaperscraft.com/image/flight_plane_sky_color_line_61872_1920x1080.jpg");
  display: grid;
  grid-template-columns: 10px 1fr 5px 1fr 10px;
  grid-template-rows: 50px auto;
  height: 100vh;
  max-height: 90%;
  grid-template-areas: 
    "h h h h h"
    "c c c c c";

  @media (max-width: 768px) {
    grid-template-rows: 80px auto;
    grid-template-areas: 
    "h h h h h"
    "c c c c c"
  }
`;

const Wrapper = ({ children }) => (
  <StyledWrapper > {children} </StyledWrapper>
)

export default Wrapper;