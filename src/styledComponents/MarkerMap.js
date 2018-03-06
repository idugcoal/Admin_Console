import React from 'react';
import styled from 'styled-components';

const StyledMarkerMap = styled.div`
  font-size: 14px;
  padding: 10px;
  font-family: "Roboto", sans-serif;
  color: #000;
  grid-area: m;
`;

const MarkerMap = ({ children }) => (
  <StyledMarkerMap > {children} </StyledMarkerMap>
)

export default MarkerMap;