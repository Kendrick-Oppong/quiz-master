import styled from "styled-components";
import { lightTheme } from "./themes";

interface BgColorProps {
  bgColor: keyof typeof lightTheme;
}

export const Main = styled.main`
  font-family: "Rubik", sans-serif;
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

export const ListItem = styled.li<BgColorProps>`
  display: flex;
  align-items: center;
  padding: 1rem 1.8rem;
  gap: 1.4rem;
  cursor: pointer;
  font-size: 1.75rem;
  border-radius: 1rem;
  color: ${(props) => props.theme.darkNavy};
  background-color: ${(props) => props.theme.pureWhite};
  transition: background-color 0.3s ease-in-out;

  /* Ensure list items are focusable and have appropriate hover styles */
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme[props.bgColor]};
  }

  p {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const IconImage = styled.img<BgColorProps>`
  background-color: ${(props) => props.theme[props.bgColor]};
  border-radius: 5px;
  padding: 0.5rem;
`;
