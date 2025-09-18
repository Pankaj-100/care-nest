import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  careseekerZipcode: number | null;
  requiredBy: string;
  serviceIds: string[];
}

const initialState: BookingState = {
  careseekerZipcode: null,
  requiredBy: "",
  serviceIds: [],
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
  },
});

export const { setCareseekerZipcode, setRequiredBy, setServiceIds } = bookingSlice.actions;
export default bookingSlice.reducer;