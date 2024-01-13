import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ConnectedDots } from "../../models/ConnectedDots";

interface SelectedDot {
  index: string | null;
  linePoints: [number, number, number] | [];
}

export type TheveninPracticalTypes = "VOLTAGE" | "VTH" | "RTH";


interface Props {
  selectedDot: SelectedDot;
  allLines: ConnectedDots[] | [];
  selectedPractical: TheveninPracticalTypes;
}

const INITIAL_STATE: Props = {
  selectedDot: { index: null, linePoints: [] },
  allLines: [],
  selectedPractical: "VOLTAGE",
};

const TheveninCanvasSlice = createSlice({
  name: "TheveninCanvasSlice",
  initialState: INITIAL_STATE,
  reducers: {
    selectDot(state, { payload }: PayloadAction<SelectedDot>) {
      state.selectedDot.index = payload.index;
      state.selectedDot.linePoints = payload.linePoints;
    },
    selectPractical(state, { payload }: PayloadAction<TheveninPracticalTypes>) {
      state.selectedPractical = payload;
    },
    addLine(state, { payload }: PayloadAction<ConnectedDots>) {
      state.allLines = [...state.allLines, payload];
    },
    removeLine(state, { payload }: PayloadAction<number>) {
      const filtered = state.allLines.filter((_, index) => index !== payload);
      state.allLines = filtered;
    },
    resetLines(state) {
      state.allLines = [];
    },
  },
});

export default TheveninCanvasSlice.reducer;

export const { selectDot, addLine, removeLine, selectPractical, resetLines} =
  TheveninCanvasSlice.actions;

export const TheveninCanvasStore = (state: RootState) => state.TheveninCanvas;
