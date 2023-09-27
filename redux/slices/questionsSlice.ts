import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface questionInterface {
  question: string;
  inputType: string;
  choices: string[];
  required: string;
}

export type questionType = questionInterface[];

export interface categorizedQuestionInterface {
  id: string;
  category: string;
  questions: questionType;
}

const initialState = {
  categories: [] as string[],
  categorizedQuestions: [] as categorizedQuestionInterface[],
};

const questions = createSlice({
  name: "questionReducer",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload);
    },
    addQuestionsToCategory: (
      state,
      action: PayloadAction<{
        category: string;
        questions: questionType;
        id: string;
      }>
    ) => {
      const { category, questions, id } = action.payload;
      state.categorizedQuestions.push({
        id,
        category,
        questions,
      });
    },
    // removeQuestions: (state, action: PayloadAction<{ categoryId: string }>) => {
    //   const { categoryId } = action.payload;
    //   console.log(categoryId);

    //   const questionIndex = state.categorizedQuestions.findIndex(
    //     (question) => question.id === categoryId
    //   );

    //   if (questionIndex !== -1) {
    //     state.categorizedQuestions = state.categorizedQuestions.filter(
    //       (item) => item.id !== categoryId
    //     );
    //   }
    // },
    removeQuestions: (state, action: PayloadAction<number>) => {
      const categoryIndex = action.payload;

      if (
        categoryIndex >= 0 &&
        categoryIndex < state.categorizedQuestions.length
      ) {
        state.categorizedQuestions.splice(categoryIndex, 1);
      }
    },
    resetCategories: (state) => {
      state.categories = [];
      state.categorizedQuestions = [];
    },
  },
});

export const {
  addCategory,
  addQuestionsToCategory,
  resetCategories,
  removeQuestions,
} = questions.actions;
export default questions.reducer;
