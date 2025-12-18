import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WeeklyScheduleSlot } from "@/types/Booking";

export interface SelectedCaregiver {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  experience: string;
  price: string;
}

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
  selectedCaregivers: SelectedCaregiver[];
  pendingBooking: PendingBookingPayload | null;
}

const initialState: BookingState = {
  careseekerZipcode: null,
  requiredBy: "",
  serviceIds: [],
  selectedCaregivers: [],
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
    setSelectedCaregivers(state, action: PayloadAction<SelectedCaregiver[]>) {
      state.selectedCaregivers = action.payload;
    },
    setPendingBooking: (state, action) => {
      state.pendingBooking = action.payload;
    },
    clearPendingBooking: (state) => {
      state.pendingBooking = null;
    },
    clearBookingState: (state) => {
      state.careseekerZipcode = null;
      state.requiredBy = "";
      state.serviceIds = [];
      state.selectedCaregivers = [];
      state.pendingBooking = null;
    },
  },
});

export const { setCareseekerZipcode, setRequiredBy, setServiceIds, setSelectedCaregivers, setPendingBooking, clearPendingBooking, clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;