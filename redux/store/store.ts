import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../slices/userSlice";
import surveyDetails from "../slices/surveyDetails";
import questionsSlice from "../slices/questionsSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  userReducer: persistReducer(persistConfig, userSlice),
  surveyDetails: persistReducer(persistConfig, surveyDetails),
  questionReducer: persistReducer(persistConfig, questionsSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
