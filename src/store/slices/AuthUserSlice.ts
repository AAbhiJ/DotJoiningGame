import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface User {
  name: string;
  email?: string;
  photoUrl?: string;
  id: string;
}

interface Props {
  authUser: User | null;
}

let INITIAL_STATE: Props = {
  authUser: null,
};

const AuthUserSlice = createSlice({
  name: "AuthUserSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setAuthUser(state, { payload }: PayloadAction<any>) {
      state.authUser = payload;
    },
    removeAuthUser(state) {
      state.authUser = null;
    },
  },
});

export default AuthUserSlice.reducer;

export const { setAuthUser,removeAuthUser } = AuthUserSlice.actions;

export const authUserStore = (state: RootState) => state.currentAuthUser;
