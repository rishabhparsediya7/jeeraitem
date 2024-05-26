"use client";

import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./feature/TicketSlice";
import teamReducer from "./feature/TeamSlice";

export const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
