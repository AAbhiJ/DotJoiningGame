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
  SWITCH1 : true,
  SWITCH2 : true,
  SWITCH3 : true,
  SWITCH4 : true,
  SWITCH5 : true,
  SWITCH6 : true,
}

export type SwitchKey = {
  switch : keyof FlipFlopSwitches,
  value : boolean
};

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
    setSwitch(state, { payload }: PayloadAction<SwitchKey>) {
      console.log(payload);
      state.switch[payload.switch] = payload.value;
    },
    toggleSwitch(state, { payload }: PayloadAction<SwitchKey>) {
      state.switch[payload.switch] = !state.switch[payload.switch];
    },
    resetLines(state) {
      state.allLines = [];
    },
  },
});

export default FlipFlopCanvasSlice.reducer;

export const { selectDot, addLine, removeLine, selectPractical, toggleSwitch, resetLines, setSwitch} =
  FlipFlopCanvasSlice.actions;

export const FlipFlopCanvasStore = (state: RootState) => state.flipFlopCanvas;
