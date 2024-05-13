import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ticket {
  id: number;
  heading: string;
  content: string;
}

interface TicketState {
  tickets: Ticket[];
}

const initialState: TicketState = {
  tickets: [],
};

export const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTicket: (
      state,
      action: PayloadAction<{ heading: string; content: string }>
    ) => {
      state.tickets.push({
        id: state.tickets.length,
        heading: action.payload.heading,
        content: action.payload.content,
      });
    },
  },
});

export default TicketSlice.reducer;
export const { addTicket } = TicketSlice.actions;
