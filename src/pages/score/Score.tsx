import { useAppSelector } from "../../redux/hooks";
import { Main } from "../../styles/common";
import {
  getAllCorrectAnswers,
  getQuizCategory,
  getQuizCategoryImage,
  getTotalQuestions,
} from "../../redux/features/quizSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { lightTheme } from "../../styles/themes";

interface BgColorProps {
  bgColor: keyof typeof lightTheme;
}

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding-block: 3rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.pureWhite};

  div {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-size: 2rem;

    img {
      padding: 1rem;
      border-radius: 1rem;
    }

    p {
      font-weight: 500;
    }
  }

  p {
    font-weight: 500;
  }
`;

const LeftContainer = styled.div`
  h1 {
    font-size: 3rem;
  }

  p {
    font-weight: 600;
    font-size: 3rem;
  }
`;

const CategoryImage = styled.img<BgColorProps>`
  background-color: ${(props) => props.theme[props.bgColor]};
  border-radius: 8px !important;
  padding: 0.3rem !important;
`;

const ScoreText = styled.p`
  font-size: 7rem;
  font-weight: bold;
`;
const PlayAgain = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.purple};
  font-family: "Rubik", sans-serif;
  color: ${(props) => props.theme.submitButton};
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  padding: 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;

  &:hover {
    background-color: #d394fa;
  }
`;

export const Score = () => {
  const correctAnswers = useAppSelector(getAllCorrectAnswers);
  const totalQuestions = useAppSelector(getTotalQuestions);
  const category = useAppSelector(getQuizCategory);
  const categoryImage = useAppSelector(getQuizCategoryImage);

  return (
    <Main>
      <LeftContainer>
        <h1>Quiz Completed</h1>
        <p>You scored...</p>
      </LeftContainer>
      <div>
        <ScoreContainer>
          <div>
            <CategoryImage
              src={categoryImage}
              alt={category}
              bgColor={`${category.toLowerCase()}Bg` as keyof typeof lightTheme}
            />
            <p>{category}</p>
          </div>
          <ScoreText>{correctAnswers}</ScoreText>
          <p style={{ fontSize: "1.3rem" }}>out of {totalQuestions}</p>
        </ScoreContainer>
        <Link to="/">
          <PlayAgain>Play Again</PlayAgain>
        </Link>
      </div>
    </Main>
  );
};
