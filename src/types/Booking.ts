// src/types/Booking.ts
export interface Caregiver {
  id: string;
  name: string;
  avatar: string | null;
  status: string;
  experience: number | null;
  price: number | null;
  isDeleted: boolean;
  isFinalSelection?: boolean;
}

export interface WeeklyScheduleSlot {
  weekDay: number;
  startTime: string;
  endTime: string;
}

export interface Booking {
  bookingId: string;
  bookedOn: string;
  startDate: string;
  endDate: string;
  zipcode: number;
  requiredBy: string;
  status: string;
  caregivers: Caregiver[];
  weeklySchedule: WeeklyScheduleSlot[];
  careType?: string;
}
