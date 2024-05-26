import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Team {
  id: string;
}

interface TeamState {
  id: string;
}

const initialState: TeamState = {
  id: "",
};

export const TeamSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTeam: (state, action) => {
      state.id = action.payload;
    },
    removeTeam: (state) => {
      state.id = "";
    },
  },
});

export default TeamSlice.reducer;
export const { addTeam, removeTeam } = TeamSlice.actions;
