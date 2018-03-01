import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.ul`
  display: flex;
  list-style: none;
  display: flex;
  padding-left: 10px;
  line-height: 50px;

  li > a {
    letter-spacing: normal;
    padding-left: 20px;
  }

  a {
    padding-left: 10px;
    text-transform: uppercase;
    text-decoration: none;
    color: #fff;
    display: inline-block;
  }
`;

const Nav = ({ children }) => (
  <StyledNav > {children} </StyledNav>
)

export default Nav;