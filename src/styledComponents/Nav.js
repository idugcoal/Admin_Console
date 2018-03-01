import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.ul`
  display: flex;
  list-style: none;
  display: flex;
  line-height: 50px;
  vertical-align: middle;

  li > * {
    letter-spacing: normal;
  }

  a {
    padding-left: 10px;
    text-transform: uppercase;
    text-decoration: none;
    color: #fff;
    display: inline-block;
  }

    @media (max-width: 768px) {
      li * {
        padding: 10px;
  }
}`;

const Nav = ({ children }) => (
  <StyledNav > {children} </StyledNav>
)

export default Nav;