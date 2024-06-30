import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { quizzes } from "../../data/quizzes.json";
import {
  answerQuestion,
  getAllCurrentQuestionIndex,
  nextQuestion,
  setQuizCategory,
  setTotalQuestions,
} from "../../redux/features/quizSlice";
import { Main } from "../../styles/common";
import { CircleCheck, CircleX } from "lucide-react";
import { useListNavigation } from "../../hooks/useListNavigation";
import { ProgressBar } from "../../components";

interface isActiveProp {
  isActive: boolean;
  isHovered: boolean;
}

const QuestionHeader = styled.p`
  font-size: 1.3rem;
  margin-top: 2rem;
  font-style: italic;
  color: ${(props) => props.theme.greyNavy};

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Question = styled.h1`
  font-weight: bold;
  margin-top: 1rem;
  font-size: 2.3rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2rem;
`;

const OptionButton = styled.button<isActiveProp>`
  padding: 0.8rem 1.5rem;
  font-family: "Rubik", sans-serif;
  background-color: ${(props) => props.theme.pureWhite};
  border: ${(props) =>
    props.isActive ? `2px solid ${props.theme.purple}` : "none"};
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: ${(props) => props.theme.purple};
  }

  span {
    background-color: ${(props) =>
      props.isHovered ? props.theme.purple : "transparent"};
    margin-right: 0.5rem;
    padding: 0.3rem;
    border-radius: 0.3rem;
  }
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.purple};
  border: none;
  padding: 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-family: "Rubik", sans-serif;
  color: ${(props) => props.theme.pureWhite};
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #d394fa;
  }
`;

const ErrorMessage = styled.p`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.incorrectAnswer};
  font-weight: 600;
  margin-top: 1rem;
`;

export const Questions = () => {
  const { title } = useParams<{ title: string }>();
  const quiz = quizzes.find(
    (quiz: { title: string }) =>
      quiz.title.toLowerCase() === title?.toLowerCase()
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentQuestionIndex = useAppSelector(getAllCurrentQuestionIndex);

  const { listItemRefs, handleKeyPress, setFocusedItemIndex } =
    useListNavigation<HTMLButtonElement>(
      quiz?.questions[currentQuestionIndex].options.length || 0
    );

  useEffect(() => {
    if (listItemRefs.current.length > 0) {
      listItemRefs.current[0]?.focus();
    }
  }, [currentQuestionIndex, listItemRefs]);

  useEffect(() => {
    if (quiz) {
      dispatch(
        setQuizCategory({ category: quiz.title, categoryImage: quiz.icon })
      );
      dispatch(setTotalQuestions(quiz.questions.length));
    }
  }, [quiz, dispatch]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setErrorMessage(null);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setErrorMessage("Please select an answer");
      return;
    }

    const isCorrect =
      selectedOption === quiz!.questions[currentQuestionIndex].answer;
    setShowAnswer(true);
    dispatch(
      answerQuestion({
        index: currentQuestionIndex,
        answer: selectedOption,
        correct: isCorrect,
      })
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz!.questions.length - 1) {
      dispatch(nextQuestion());
      setSelectedOption(null);
      setFocusedItemIndex(0);
      setShowAnswer(false);
    } else {
      navigate("/score");
    }
  };

  if (!quiz) {
    return <p>Quiz not found!</p>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <Main>
      <div>
        <QuestionHeader>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </QuestionHeader>
        <Question>{currentQuestion.question}</Question>

        {/* Progress bar */}
        <ProgressBar progress={progress} />
      </div>
      <div>
        <OptionsContainer>
          {currentQuestion.options.map((option, optionIndex) => {
            const optionLetter = String.fromCharCode(65 + optionIndex);
            const isSelected = selectedOption === option;
            const isCorrect = showAnswer && option === currentQuestion.answer;
            const isIncorrect = showAnswer && isSelected && !isCorrect;

            return (
              <OptionButton
                key={optionIndex}
                ref={(el) => (listItemRefs.current[optionIndex] = el)}
                onClick={() => handleOptionSelect(option)}
                onKeyDown={(e) => handleKeyPress(e)}
                tabIndex={0}
                aria-label={option}
                role="option"
                aria-selected={isSelected ? "true" : "false"}
                isActive={isSelected}
                isHovered={!showAnswer && isSelected}
                style={{
                  borderColor: isCorrect
                    ? "#26d782"
                    : isIncorrect
                    ? "#ee5454"
                    : "",
                }}
              >
                <span
                  style={{
                    padding: "1rem",
                    fontWeight: 600,
                    borderRadius: ".5rem",
                    backgroundColor: isCorrect
                      ? "#26d782"
                      : isIncorrect
                      ? "#ee5454"
                      : isSelected
                      ? "#a729f5"
                      : "#f4f6fa",
                  }}
                >
                  {optionLetter}
                </span>
                {option}
                {isCorrect && <CircleCheck color="#26d782" />}
                {isIncorrect && <CircleX color="#ee5454" />}
              </OptionButton>
            );
          })}
        </OptionsContainer>
        <SubmitButton onClick={showAnswer ? handleNextQuestion : handleSubmit}>
          {showAnswer
            ? isLastQuestion
              ? "View Score"
              : "Next Question"
            : "Submit Answer"}
        </SubmitButton>
        {errorMessage && (
          <ErrorMessage>
            <CircleX color="#ee5454" />
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    </Main>
  );
};
