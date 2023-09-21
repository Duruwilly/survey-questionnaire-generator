import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userDetails = {
  name: string;
  role: string;
};

const initialState: userDetails = {
  name: "",
  role: "",
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<userDetails>) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    logOut: (state) => {
      (state.name = ""), (state.role = "");
    },
  },
});

export const { addUser, logOut } = userSlice.actions;
export default userSlice.reducer;
