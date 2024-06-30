import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after {
    box-sizing: inherit;
    font-weight:lighter;
    margin: 0;
    padding: 0;
}

html {
    box-sizing: border-box;
    position: relative;
}


 
  body {
    margin: 0;
    padding: 3rem;
    box-sizing: border-box;
    font-optical-sizing: auto;
    font-family: "Rubik", sans-serif;
    background-color: ${(props) => props.theme.lightGrey};
    /* color: ${(props) => props.theme.darkNavy}; */
      @media (max-width: 768px) {
         padding: 1.5rem;
    }
  }

  li {
     list-style:none
  }

  a {
    text-decoration:none
  }
`;

export default GlobalStyles;
