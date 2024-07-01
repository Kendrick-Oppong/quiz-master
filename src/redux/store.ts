import { configureStore } from "@reduxjs/toolkit";
import quizSliceReducer from "./features/quizSlice";
import themeSliceReducer from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    quiz: quizSliceReducer,
    theme: themeSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {quiz: QuizState}
export type AppDispatch = typeof store.dispatch;
