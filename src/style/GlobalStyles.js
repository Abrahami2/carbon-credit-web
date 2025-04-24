import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.palette.background.default};
    color: ${props => props.theme.palette.text.primary};
  }

`;

export default GlobalStyles;