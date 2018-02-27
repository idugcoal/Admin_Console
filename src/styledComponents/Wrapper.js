import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 10px;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-image: url("https://wallpaperscraft.com/image/flight_plane_sky_color_line_61872_1920x1080.jpg");
  background-color: #3b3b3b;
`;

const Wrapper = ({ children }) => (
  <StyledWrapper > {children} </StyledWrapper>
)

export default Wrapper;