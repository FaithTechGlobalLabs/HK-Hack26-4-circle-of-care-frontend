"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { color-scheme: light; }
  html, body { margin: 0; }
  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 17px;
    line-height: 1.45;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
  }
  a { color: ${({ theme }) => theme.colors.primary}; }
  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.cond};
    margin: 0;
    line-height: 1.05;
    text-wrap: balance;
    text-transform: uppercase;
  }
  h1 { font-size: clamp(2.1rem, 7vw, 3rem); font-weight: 800; }
  h2 { font-size: 1.5rem; font-weight: 700; letter-spacing: 0.02em; }
  p { margin: 0; }
  button, input, select, textarea { font: inherit; color: inherit; }
  :focus-visible { outline: 3px solid ${({ theme }) => theme.colors.primary}; outline-offset: 2px; }
`;

export default GlobalStyle;
