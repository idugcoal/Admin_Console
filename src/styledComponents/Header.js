import React from 'react';
import styled from 'styled-components'

const StyledHeader = styled.div`
  display: flex;
  color: #fff;
  grid-area: h;
  font-size: 24px;
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  background-color: rgba(60,60,60,0.5);
  color: white;
  line-height: 50px;
  letter-spacing: 3px;
  padding-right: 10px;
  padding-left: 10px;
  justify-content: space-between;
  box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  
  a: first-child {
    text-decoration: none;
    color: white;
    float: left;
  }

  @media (max-width: 768px) {
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    flex-direction: column;
    line-height: 20px;
}`;

const Header = ({ children }) => (
  <StyledHeader> {children} </StyledHeader>
)
 
export default Header