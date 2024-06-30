import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface QuizState {
  answers: Record<number, string>;
  currentQuestionIndex: number;
}

const initialState: QuizState = {
  answers: {},
  currentQuestionIndex: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    answerQuestion: (
      state,
      action: PayloadAction<{ index: number; answer: string }>
    ) => {
      state.answers[action.payload.index] = action.payload.answer;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    resetQuiz: (state) => {
      state.answers = {};
      state.currentQuestionIndex = 0;
    },
  },
});

export const { answerQuestion, nextQuestion, resetQuiz } = quizSlice.actions;

export const getAllCurrentQuestionIndex = (state: RootState) =>
  state.quiz.currentQuestionIndex;

export const getAllCorrectAnswers = (state: RootState) => state.quiz.answers;
export default quizSlice.reducer;
