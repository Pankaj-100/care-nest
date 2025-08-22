// src/types/Booking.ts
export interface Caregiver {
  id: string | null;
  name: string | null;
  avatar?: string | null; // <-- match API
  specialty?: string | null;
  experience?: string | number | null;
  price?: string | number | null; // <-- match API
  status?: string | null;
  isFinalSelection?: boolean | null;
  isDeleted?: boolean;
  isBookmarked?: boolean;
}

export interface Booking {
  bookingId: string;
  careType?: string | null;
  bookedOn: string;
  appointmentDate?: string | null;
  duration?: string | number | null;
  service?: string | null;
  status: string;
  caregivers: Caregiver[];
}