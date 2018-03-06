import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  // @import url(https://fonts.googleapis.com/css?family=Roboto:300);
  // background-image: url("https://wallpaperscraft.com/image/flight_plane_sky_color_line_61872_1920x1080.jpg");
  background: rgba(212,228,239,1);
  background: -moz-linear-gradient(-45deg, rgba(212,228,239,1) 0%, rgba(207,224,237,1) 7%, rgba(140,178,207,1) 92%, rgba(134,174,204,1) 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(212,228,239,1)), color-stop(7%, rgba(207,224,237,1)), color-stop(92%, rgba(140,178,207,1)), color-stop(100%, rgba(134,174,204,1)));
  background: -webkit-linear-gradient(-45deg, rgba(212,228,239,1) 0%, rgba(207,224,237,1) 7%, rgba(140,178,207,1) 92%, rgba(134,174,204,1) 100%);
  background: -o-linear-gradient(-45deg, rgba(212,228,239,1) 0%, rgba(207,224,237,1) 7%, rgba(140,178,207,1) 92%, rgba(134,174,204,1) 100%);
  background: -ms-linear-gradient(-45deg, rgba(212,228,239,1) 0%, rgba(207,224,237,1) 7%, rgba(140,178,207,1) 92%, rgba(134,174,204,1) 100%);
  background: linear-gradient(135deg, rgba(212,228,239,1) 0%, rgba(207,224,237,1) 7%, rgba(140,178,207,1) 92%, rgba(134,174,204,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d4e4ef', endColorstr='#86aecc', GradientType=1 );
  display: grid;
  grid-template-columns: 10px 1fr 5px 1fr 10px;
  grid-template-rows: 50px auto;
  height: 100vh;
  max-height: 90%;
  grid-template-areas: 
    "h h h h h"
    "c c c c c";

  @media (max-width: 768px) {
    grid-template-rows: 48px auto;
    grid-template-areas: 
    "h h h h h"
    "c c c c c"
  }
`;

const Wrapper = ({ children }) => (
  <StyledWrapper > {children} </StyledWrapper>
)

export default Wrapper;