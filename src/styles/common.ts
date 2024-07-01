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

export const IconImage = styled.img<BgColorProps>`
  background-color: ${(props) => props.theme[props.bgColor]};
  border-radius: 5px;
  padding: 0.5rem;
`;
