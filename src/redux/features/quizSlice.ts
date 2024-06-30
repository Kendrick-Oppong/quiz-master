import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface QuizState {
  answers: Record<number, string>;
  currentQuestionIndex: number;
  correctAnswers: number;
  totalQuestions: number;
  category: string;
  categoryImage: string;
}

const initialState: QuizState = {
  answers: {},
  currentQuestionIndex: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  category: "",
  categoryImage: "",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    answerQuestion: (
      state,
      action: PayloadAction<{ index: number; answer: string; correct: boolean }>
    ) => {
      state.answers[action.payload.index] = action.payload.answer;
      if (action.payload.correct) {
        state.correctAnswers += 1;
      }
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    resetQuiz: (state) => {
      state.answers = {};
      state.currentQuestionIndex = 0;
      state.correctAnswers = 0;
      state.totalQuestions = 0;
      state.category = "";
      state.categoryImage = "";
    },
    setQuizCategory: (
      state,
      action: PayloadAction<{ category: string; categoryImage: string }>
    ) => {
      state.category = action.payload.category;
      state.categoryImage = action.payload.categoryImage;
    },
    setTotalQuestions: (state, action: PayloadAction<number>) => {
      state.totalQuestions = action.payload;
    },
  },
});

export const {
  answerQuestion,
  nextQuestion,
  resetQuiz,
  setQuizCategory,
  setTotalQuestions,
} = quizSlice.actions;

export const getAllCurrentQuestionIndex = (state: RootState) =>
  state.quiz.currentQuestionIndex;

export const getAllCorrectAnswers = (state: RootState) =>
  state.quiz.correctAnswers;

export const getQuizCategory = (state: RootState) => state.quiz.category;

export const getQuizCategoryImage = (state: RootState) =>
  state.quiz.categoryImage;

export const getTotalQuestions = (state: RootState) =>
  state.quiz.totalQuestions;

export default quizSlice.reducer;
