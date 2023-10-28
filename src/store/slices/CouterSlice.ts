import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface Props {
  counter: number;
}

const INITIAL_STATE: Props = {
  counter: 0,
};

const CounterSlice = createSlice({
  name: "CounterSlice",
  initialState: INITIAL_STATE,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    addBy(state, { payload }: PayloadAction<number>) {
      state.counter+=payload;
    },
  },
});

export default CounterSlice.reducer;

export const { increment,decrement, addBy } = CounterSlice.actions;

export const CounterStore = (state: RootState) => state.counter;
