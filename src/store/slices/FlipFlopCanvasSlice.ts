import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ConnectedDots } from "../../models/ConnectedDots";

interface SelectedDot {
  index: string | null;
  linePoints: [number, number, number] | [];
}

interface Props {
  selectedDot : SelectedDot;
  allLines : ConnectedDots[] | [];
}

const INITIAL_STATE: Props = {
  selectedDot : {index : null, linePoints : []},
  allLines : []
};

const FlipFlopCanvasSlice = createSlice({
  name: "FlipFlopCanvasSlice",
  initialState: INITIAL_STATE,
  reducers: {
    selectDot(state, { payload }: PayloadAction<SelectedDot>) {
      state.selectedDot.index=payload.index;
      state.selectedDot.linePoints=payload.linePoints;
    },
    addLine(state, { payload }: PayloadAction<ConnectedDots>) {
      state.allLines = [...state.allLines,payload];
    },
    removeLine(state, { payload }: PayloadAction<number>) {
      const filtered = state.allLines.filter((_, index) => index !== payload)
      state.allLines = filtered;
    },
  },
});

export default FlipFlopCanvasSlice.reducer;

export const { selectDot, addLine, removeLine } = FlipFlopCanvasSlice.actions;

export const FlipFlopCanvasStore = (state: RootState) => state.flipFlopCanvas;
