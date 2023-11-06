import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ConnectedDots } from "../../models/ConnectedDots";

interface SelectedDot {
  index: string | null;
  linePoints: [number, number, number] | [];
}

export type FlipFlopPracticalTypes = "SR" | "D" | "CLOCKED";

export class FlipFlopSwitches{
  public SWITCH1 : boolean = false;
  public SWITCH2 : boolean = false;
  public SWITCH3 : boolean = false;
  public SWITCH4 : boolean = false;
  public SWITCH5 : boolean = false;
  public SWITCH6 : boolean = false;
}

const DEFAULT_SWITCHES : FlipFlopSwitches = {
  SWITCH1 : false,
  SWITCH2 : false,
  SWITCH3 : false,
  SWITCH4 : false,
  SWITCH5 : false,
  SWITCH6 : false,
}

export type SwitchKey = keyof FlipFlopSwitches;

interface Props {
  selectedDot: SelectedDot;
  allLines: ConnectedDots[] | [];
  selectedPractical: FlipFlopPracticalTypes;
  switch : FlipFlopSwitches;
}

const INITIAL_STATE: Props = {
  selectedDot: { index: null, linePoints: [] },
  allLines: [],
  selectedPractical: "SR",
  switch : DEFAULT_SWITCHES,
};

const FlipFlopCanvasSlice = createSlice({
  name: "FlipFlopCanvasSlice",
  initialState: INITIAL_STATE,
  reducers: {
    selectDot(state, { payload }: PayloadAction<SelectedDot>) {
      state.selectedDot.index = payload.index;
      state.selectedDot.linePoints = payload.linePoints;
    },
    selectPractical(state, { payload }: PayloadAction<FlipFlopPracticalTypes>) {
      state.selectedPractical = payload;
    },
    addLine(state, { payload }: PayloadAction<ConnectedDots>) {
      state.allLines = [...state.allLines, payload];
    },
    removeLine(state, { payload }: PayloadAction<number>) {
      const filtered = state.allLines.filter((_, index) => index !== payload);
      state.allLines = filtered;
    },
    toggleSwitch(state, { payload }: PayloadAction<SwitchKey>) {
      state.switch[payload] = !state.switch[payload];
    },
  },
});

export default FlipFlopCanvasSlice.reducer;

export const { selectDot, addLine, removeLine, selectPractical, toggleSwitch } =
  FlipFlopCanvasSlice.actions;

export const FlipFlopCanvasStore = (state: RootState) => state.flipFlopCanvas;
