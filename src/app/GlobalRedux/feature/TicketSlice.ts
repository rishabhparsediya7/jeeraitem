import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ticket {
  count: number;
}

interface TicketState {
  count: number;
}

const initialState: TicketState = {
  count: 0,
};

export const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTicket: (state) => {
      state.count += 1;
    },
    removeTicket: (state) => {
      state.count -= 1;
    },
  },
});

export default TicketSlice.reducer;
export const { addTicket, removeTicket } = TicketSlice.actions;
