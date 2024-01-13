import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import AuthUserReducer from "./slices/AuthUserSlice";
import CounterReducer from "./slices/CouterSlice";
import FlipFlopCanvasSlice from "./slices/FlipFlopCanvasSlice";
import TheveninCanvasSlice from "./slices/TheveninCanvasSlice";

export const store = configureStore({
  reducer: {
    currentAuthUser: AuthUserReducer,
    counter : CounterReducer,
    flipFlopCanvas : FlipFlopCanvasSlice,
    TheveninCanvas : TheveninCanvasSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//*typescript support
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
