import { getAllCorrectAnswers } from "../../redux/features/quizSlice";
import { useAppSelector } from "../../redux/hooks";
import { quizzes } from "../../data/quizzes.json";


export const Score = () => {
  const answers = useAppSelector(getAllCorrectAnswers);

  let correctAnswers = 0;

  Object.keys(answers).forEach((index) => {
    const answerIndex = parseInt(index);
    const quiz = quizzes.find((quiz) =>
      quiz.questions.some(
        (question) => question.question === answers[answerIndex]
      )
    );
    if (quiz) {
      const question = quiz.questions[answerIndex];
      if (question.answer === answers[answerIndex]) {
        correctAnswers += 1;
      }
    }
  });

  const score = (correctAnswers / Object.keys(answers).length) * 100;

  return (
    <div>
      <h1>Your Score</h1>
      <p>
        You got {correctAnswers} out of {Object.keys(answers).length} correct.
      </p>
      <p>Your score is {score}%.</p>
    </div>
  );
};


