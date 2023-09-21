import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface questionInterface {
  // category: string;
  question: string;
  inputType: string;
  choices: string[];
  required: string;
  id: string;
}

export type questionType = questionInterface[];

export interface categoryInterface {
  category: string;
}

export interface categorizedQuestionsInterface {
  category: string;
  questions: questionType;
}

const initialState = {
  categories: [] as categoryInterface[],
  categorizedQuestions: [] as categorizedQuestionsInterface[],
};

const questions = createSlice({
  name: "questionReducer",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push({ category: action.payload });
    },
    addQuestionsToCategory: (
      state,
      action: PayloadAction<{ category: string; questions: questionType }>
    ) => {
      state.categorizedQuestions.push({
        category: action.payload.category,
        questions: action.payload.questions,
      });
    },
    resetCategories: (state) => {
      state.categories = [];
      state.categorizedQuestions = [];
    },
  },
});

export const { addCategory, addQuestionsToCategory, resetCategories } =
  questions.actions;
export default questions.reducer;
