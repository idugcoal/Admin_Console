import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.div`
  text-decoration: none;
  color: #fff;
  font-size: 1.2em;
  text-transform: uppercase;
  letter-spacing: 3px; 
  display: flex;
  justify-content: center;
`;

const Logo = ({ children }) => (
  <StyledLogo > {children} </StyledLogo>
)

export default Logo;