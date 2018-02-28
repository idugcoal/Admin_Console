import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background-color: #1D1F20;
  color: #fff;
  display: flex;
  grid-area: "header";
  align-items: center;
  font-size: 18px;
  padding-left: 10px;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  background-color: rgba(60, 60, 60, 0.5);
  color: white;
  // height: 60px;
`;

const Header = ({ children }) => (
  <StyledHeader > {children} </StyledHeader>
)

export default Header;