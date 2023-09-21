import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type surveyDetails = {
  surveyName: string;
  surveyDesc: string;
  numberOfCategory: string;
};

const initialState: surveyDetails = {
  surveyName: "",
  surveyDesc: "",
  numberOfCategory: "",
};

const detailsSlice = createSlice({
  name: "surveyDetails",
  initialState,
  reducers: {
    addSurveyDetails: (state, action: PayloadAction<surveyDetails>) => {
      state.surveyName = action.payload.surveyName;
      state.numberOfCategory = action.payload.numberOfCategory;
      state.surveyDesc = action.payload.surveyDesc;
    },
  },
});

export const { addSurveyDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
