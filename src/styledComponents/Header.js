import React from 'react';
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: #1D1F20;
  display: flex;
  color: #fff;
  grid-area: h;
  font-size: 24px;
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  background-color: rgba(60, 60, 60, 0.5);
  color: white;
  line-height: 50px;
  letter-spacing: 3px;
  padding-right: 10px;
  padding-left: 10px;
  justify-content: space-between;
  
  a: first-child {
    text-decoration: none;
    color: white;
    float: left;
  }

  @media (max-width: 768px) {
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    flex-direction: column;
    line-height: 28px;
}`;

const Header = ({ children }) => (
  <StyledHeader> {children} </StyledHeader>
)
 
export default Header