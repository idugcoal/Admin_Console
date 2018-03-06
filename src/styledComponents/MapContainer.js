import React from 'react';
import styled from 'styled-components';

const StyledMapContainer = styled.div`
  
  height: 600px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const MapContainer = ({ children }) => (
  <StyledMapContainer> {children} </StyledMapContainer>
)

export default MapContainer;