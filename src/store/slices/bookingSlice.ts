import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WeeklyScheduleSlot } from "@/types/Booking";

interface PendingBookingPayload {
  startDate: string;
  endDate?: string;
  serviceIds: string[];
  careseekerZipcode: number;
  requiredBy: string;
  weeklySchedule: WeeklyScheduleSlot[];
  shortlistedCaregiversIds: string[];
}

interface BookingState {
  careseekerZipcode: number | null;
  requiredBy: string;
  serviceIds: string[];
  pendingBooking: PendingBookingPayload | null;
}

const initialState: BookingState = {
  careseekerZipcode: null,
  requiredBy: "",
  serviceIds: [],
  pendingBooking: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCareseekerZipcode(state, action: PayloadAction<number>) {
      state.careseekerZipcode = action.payload;
    },
    setRequiredBy(state, action: PayloadAction<string>) {
      state.requiredBy = action.payload;
    },
    setServiceIds(state, action: PayloadAction<string[]>) {
      state.serviceIds = action.payload;
    },
    setPendingBooking: (state, action) => {
      state.pendingBooking = action.payload;
    },
    clearPendingBooking: (state) => {
      state.pendingBooking = null;
    },
  },
});

export const { setCareseekerZipcode, setRequiredBy, setServiceIds, setPendingBooking, clearPendingBooking } = bookingSlice.actions;
export default bookingSlice.reducer;