import styled from "styled-components";
import { ToggleMode } from "./ModeToggle";
import { useAppSelector } from "../redux/hooks";
import {
  getQuizCategory,
  getQuizCategoryImage,
} from "../redux/features/quizSlice";
import { darkTheme, lightTheme } from "../styles/themes";

interface BgColorProps {
  bgColor: keyof typeof lightTheme | keyof typeof darkTheme;
}

const MainWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  p {
    font-weight: 500;
    font-size: 1.2rem;
  }
`;

const CategoryImage = styled.img<BgColorProps>`
  background-color: ${(props) => props.theme[props.bgColor]};
  border-radius: 8px !important;
  padding: 0.3rem !important;
`;

export const Header = () => {
  const category = useAppSelector(getQuizCategory);
  const categoryImage = useAppSelector(getQuizCategoryImage);

  return (
    <MainWrapper>
      <Logo>
        <CategoryImage
          src={categoryImage}
          alt={category}
          bgColor={`${category.toLowerCase()}Bg` as keyof typeof lightTheme}
        />
        {category && <p>{category}</p>}
      </Logo>

      <div>
        <ToggleMode />
      </div>
    </MainWrapper>
  );
};
