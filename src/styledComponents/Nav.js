import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.div`
  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  a {
    text-transform: uppercase;
    text-decoration: none;
    color: #fff;
    padding: 20px;
    display: inline-block;
  }
`;

const Nav = ({ children }) => (
  <StyledNav > {children} </StyledNav>
)

export default Nav;