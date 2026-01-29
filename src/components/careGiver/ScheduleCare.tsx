"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import BookSuccessful from "./BookSuccessful";
import {
  useCreateBookingMutation,
  useEditBookingMutation,
} from "@/store/api/bookingApi";
import { CustomButton } from "@/components/common/CustomInputs";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPendingBooking } from "@/store/slices/bookingSlice";
// Use the imported SVG component (alias to PascalCase for JSX)
import { calendarIcon as CalenderIcon } from "../icons/page";
import { useSearchParams, useRouter } from "next/navigation";

export interface SelectedCaregiver {
  id: string;
  name: string;
  specialty: string;
  price: string;
  experience: string;
  avatar: string;
  isBookmarked?: boolean;
}

export interface ScheduleCareProps {
  isOpen: boolean;
  OnClose: () => void;
  selectedCaregivers: SelectedCaregiver[];
  onBookingSuccess?: (updatedValues: {
    startDate: string;
    meetingDate: string;
    endDate: string | null;
    weeklySchedule: { weekDay: number; startTime: string; endTime: string }[];
  }) => void;
  serviceIds?: string[];
  requiredBy?: string;
  zipcode?: number;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  initialMeetingDate?: Date | null;
  initialWeeklySchedule?: {
    weekDay: number;
    startTime: string;
    endTime: string;
  }[];
  isEditMode?: boolean;
  bookingId?: string;
  lockStartAndMeetingDates?: boolean;
}

interface BookingResponse {
  success?: boolean;
  message?: string;
}

function isBookingResponse(r: unknown): r is BookingResponse {
  return typeof r === "object" && r !== null && "success" in r;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
type Day = (typeof DAYS)[number];

const defaultStart = 9 * 60; // 09:00 AM
const defaultEnd = 17 * 60; // 05:00 PM (changed to 24-hour range)

// Convert minutes to 12-hour format
const formatTime12Hour = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")} ${period}`;
};

const defaultRanges: { id: string; start: number; end: number }[] = [
  { id: "r1", start: 9 * 60, end: 17 * 60 }, // 09:00 AM - 05:00 PM
];

const initialSchedule: Record<Day, { id: string; start: number; end: number }[]> = DAYS.reduce(
  (acc, d) => {
    acc[d] = d === "Sun" || d === "Mon" ? defaultRanges.map((r) => ({ ...r, id: `${d}-${r.id}` })) : [];
    return acc;
  },
  {} as Record<Day, { id: string; start: number; end: number }[]>
);

const ScheduleCare = ({
  isOpen,
  OnClose,
  selectedCaregivers,
  onBookingSuccess,
  serviceIds,
  requiredBy,
  zipcode,
  initialStartDate,
  initialEndDate,
  initialMeetingDate,
  initialWeeklySchedule,
  isEditMode,
  bookingId,
  lockStartAndMeetingDates = false,
}: ScheduleCareProps) => {
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const [editBooking, { isLoading: isEditing }] = useEditBookingMutation();

  const requiredByRedux = useAppSelector((state) => state.booking.requiredBy);
  const serviceIdsRedux = useAppSelector((state) => state.booking.serviceIds);
  const careseekerZipcodeRedux = useAppSelector((state) => state.booking.careseekerZipcode);

  // Helper to get tomorrow's date (minimum selectable date)
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  // Helper to normalize date (remove time component for proper comparison)
  const normalizeDate = (date: Date | null): Date | null => {
    if (!date) return null;
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  // Helper to get the max of two dates (used to ensure minDate never goes below tomorrow)
  const getMaxDate = (date1: Date | null, date2: Date): Date => {
    if (!date1) return date2;
    const normalized1 = normalizeDate(date1);
    return normalized1 && normalized1 > date2 ? normalized1 : date2;
  };

  const minSelectableDate = getTomorrowDate();

  const [startDate, setStartDate] = useState<Date | null>(initialStartDate || minSelectableDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate || null);
  const [meetingDate, setMeetingDate] = useState<Date | null>(initialMeetingDate || minSelectableDate);

  // Helper to convert "09:00" to minutes
  const timeStrToMinutes = (str: string) => {
    const [h, m] = str.split(":").map(Number);
    return h * 60 + m;
  };

  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [schedule, setSchedule] = useState<Record<Day, { id: string; start: number; end: number }[]>>(initialSchedule);
  const [applyAll, setApplyAll] = useState(true);
  const [varySchedule, setVarySchedule] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const bookingSuccess = searchParams.get("bookingSuccess") === "true";

  useEffect(() => {
    if (bookingSuccess) {
      setIsSuccessModalOpen(true);
    }
  }, [bookingSuccess]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && OnClose();
    if (isOpen) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, OnClose]);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialWeeklySchedule && initialWeeklySchedule.length > 0) {
        // Build days and schedule from initialWeeklySchedule
        const days: Day[] = [];
        const sched: Record<Day, { id: string; start: number; end: number }[]> = {
          Sun: [],
          Mon: [],
          Tue: [],
          Wed: [],
          Thu: [],
          Fri: [],
          Sat: [],
        };
        initialWeeklySchedule.forEach((slot) => {
          const day = DAYS[slot.weekDay];
          if (!days.includes(day)) days.push(day);
          sched[day] = [{
            id: `${day}-0`,
            start: timeStrToMinutes(slot.startTime),
            end: timeStrToMinutes(slot.endTime),
          }];
        });
        setSelectedDays(days);
        setSchedule(sched);
        setApplyAll(false);
      } else {
        // Default for new booking or no previous schedule
        setSelectedDays(["Sun", "Mon"]);
        setSchedule(initialSchedule);
        setApplyAll(true);
      }
    }
    // Reset dragging state if modal is closed
    if (!isOpen) {
      setSelectedDays([]);
      setSchedule(initialSchedule);
      setApplyAll(true);
    }
  }, [isOpen, isEditMode, initialWeeklySchedule]);

  // Change time with better UX - separate handlers for start and end (24-hour range)
  const changeStartTime = (d: Day, value: number) => {
    const v = Math.max(0, Math.min(23 * 60 + 45, value));

    setSchedule((prev) => {
      let res = { ...prev };

      if (applyAll && selectedDays.length > 1) {
        // When applyAll is true, update ALL selected days with the same time
        selectedDays.forEach((sd) => {
          const currentEnd = prev[sd]?.[0]?.end || defaultEnd;
          const newEnd = currentEnd <= v + 30 ? Math.min(23 * 60 + 59, v + 60) : currentEnd;

          res[sd] = [
            {
              id: `${sd}-0`,
              start: v,
              end: newEnd,
            },
          ];
        });
      } else {
        // When applyAll is false, only update the current day
        const updated = prev[d].map((r) => {
          const next = { ...r, start: v };
          if (next.end <= next.start + 30) {
            next.end = Math.min(23 * 60 + 59, next.start + 60);
          }
          return next;
        });
        res = { ...prev, [d]: updated };
      }

      return res;
    });
  };

  const changeEndTime = (d: Day, value: number) => {
    const v = Math.max(1 * 60, Math.min(23 * 60 + 59, value));

    setSchedule((prev) => {
      let res = { ...prev };

      if (applyAll && selectedDays.length > 1) {
        // When applyAll is true, update ALL selected days with the same time
        selectedDays.forEach((sd) => {
          const currentStart = prev[sd]?.[0]?.start || defaultStart;
          const newStart = currentStart >= v - 30 ? Math.max(0, v - 60) : currentStart;

          res[sd] = [
            {
              id: `${sd}-0`,
              start: newStart,
              end: v,
            },
          ];
        });
      } else {
        // When applyAll is false, only update the current day
        const updated = prev[d].map((r) => {
          const next = { ...r, end: v };
          if (next.start >= next.end - 30) {
            next.start = Math.max(0, next.end - 60);
          }
          return next;
        });
        res = { ...prev, [d]: updated };
      }

      return res;
    });
  };

  // When toggling a day, always seed with one slot if missing
  const toggleDay = (d: Day) => {
    setSelectedDays((prev) => {
      const isRemoving = prev.includes(d);

      if (isRemoving) {
        return prev.filter((x) => x !== d);
      } else {
        return [...prev, d];
      }
    });

    setSchedule((prev) => {
      // If removing a day, clear its schedule
      if (prev[d] && selectedDays.includes(d)) {
        return { ...prev, [d]: [] };
      }

      // If adding a new day, determine what time slots to use
      let timeSlotToUse = {
        start: defaultStart,
        end: defaultEnd,
      };

      // If "Apply to all days" is enabled and there are existing selected days,
      // use the time from the first selected day
      if (applyAll && selectedDays.length > 0) {
        const firstSelectedDay = selectedDays[0];
        const firstDaySchedule = prev[firstSelectedDay]?.[0];

        if (firstDaySchedule) {
          timeSlotToUse = {
            start: firstDaySchedule.start,
            end: firstDaySchedule.end,
          };
        }
      }

      // Add the new day with the determined time slot
      return {
        ...prev,
        [d]: [
          {
            id: `${d}-0`,
            start: timeSlotToUse.start,
            end: timeSlotToUse.end,
          },
        ],
      };
    });
  };

  const daySummary = (d: Day) =>
    (schedule[d] || [])
      .map((r) => `${formatTime12Hour(r.start)} - ${formatTime12Hour(r.end)}`)
      .join(", ") || "No time set";

  // Get time markers for the slider (24-hour format) - FIXED
  const getTimeMarkers = () => {
    const markers = [];
    // Show markers every 4 hours, starting at 0 (12:00 AM)
    for (let hour = 0; hour < 24; hour += 4) {
      markers.push({
        value: hour * 60,
        label: formatTime12Hour(hour * 60),
      });
    }
    // Add final marker for 11:59 PM
    markers.push({
      value: 23 * 60 + 59,
      label: formatTime12Hour(23 * 60 + 59),
    });
    return markers;
  };

  const timeMarkers = getTimeMarkers();

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate dates only when relevant
    if (!isEditMode) {
      if (!meetingDate) return setFormError("Please provide preferred meeting date");
      if (!startDate) return setFormError("Please provide service start date");
      const meetingMid = meetingDate ? new Date(meetingDate) : null;
      const startMid = startDate ? new Date(startDate) : null;
      if (meetingMid && startMid) {
        meetingMid.setHours(0, 0, 0, 0);
        startMid.setHours(0, 0, 0, 0);
        if (startMid < meetingMid) {
          return setFormError("Service Start Date cannot be earlier than the Preferred Meeting Date.");
        }
      }
    } else if (!lockStartAndMeetingDates) {
      // In edit mode, validate only if fields are not locked
      if (!meetingDate) return setFormError("Please provide preferred meeting date");
      if (!startDate) return setFormError("Please provide service start date");
      const meetingMid = meetingDate ? new Date(meetingDate) : null;
      const startMid = startDate ? new Date(startDate) : null;
      if (meetingMid && startMid) {
        meetingMid.setHours(0, 0, 0, 0);
        startMid.setHours(0, 0, 0, 0);
        if (startMid < meetingMid) {
          return setFormError("Service Start Date cannot be earlier than the Preferred Meeting Date.");
        }
      }
    }

    // Only validate startDate in edit mode
    if (isEditMode) {
      // Validate meeting duration days selection
      if (selectedDays.length === 0) return setFormError("Select at least one meeting duration day");

      // Build weeklySchedule array
      const weeklySchedule: { weekDay: number; startTime: string; endTime: string }[] = [];
      selectedDays.forEach((d) => {
        const slot = schedule[d]?.[0];
        if (slot) {
          weeklySchedule.push({
            weekDay: DAYS.indexOf(d),
            startTime: fmtTime(slot.start),
            endTime: fmtTime(slot.end),
          });
        }
      });

      const payload: {
        startDate: string;
        meetingDate: string;
        endDate?: string;
        weeklySchedule: { weekDay: number; startTime: string; endTime: string }[];
      } = {
        startDate: formatDateToString(startDate),
        meetingDate: formatDateToString(meetingDate),
        weeklySchedule,
      };

      // Only include endDate if it has a valid value
      const formattedEndDate = formatDateToString(endDate);
      if (formattedEndDate) {
        payload.endDate = formattedEndDate;
      }

      try {
        if (bookingId) {
          const result = await editBooking({ bookingId, payload }).unwrap();
          if (isBookingResponse(result) && result.success) {
            OnClose();
            if (onBookingSuccess) {
              onBookingSuccess({
                startDate: payload.startDate,
                meetingDate: payload.meetingDate,
                endDate: payload.endDate ?? null,
                weeklySchedule: payload.weeklySchedule,
              });
            }
          } else {
            setFormError(result.message || "Update failed. Please try again.");
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any){
        const apiMessage =
    err?.data?.message ||
    err?.message ||
    "Update failed. Please try again.";
  setFormError(apiMessage);
      }
      return;
    }

    // --- Existing validations for new booking ---
    const effectiveServiceIds = serviceIds || serviceIdsRedux || [];
    if (effectiveServiceIds.length === 0)
      return setFormError("You missed service selection, start the booking from home page.");

    if (selectedCaregivers.length < 1) return setFormError("Select at least one caregiver.");
    if (selectedDays.length === 0) return setFormError("Select at least one meeting duration day");

    // Build weeklySchedule array
    const weeklySchedule: { weekDay: number; startTime: string; endTime: string }[] = [];
    selectedDays.forEach((d) => {
      // Only take the first slot for each day
      const slot = schedule[d]?.[0];
      if (slot) {
        weeklySchedule.push({
          weekDay: DAYS.indexOf(d),
          startTime: fmtTime(slot.start),
          endTime: fmtTime(slot.end),
        });
      }
    });

    // Prepare shortlistedCaregiversIds from selectedCaregivers
    const shortlistedCaregiversIds = selectedCaregivers.map((c) => c.id);

    // Use effective values (prop or Redux fallback)
    const effectiveRequiredBy = requiredBy || requiredByRedux;
    const effectiveZipcode = zipcode || careseekerZipcodeRedux;

    // API payload
    const payload: {
      startDate: string;
      meetingDate: string;
      serviceIds: string[];
      careseekerZipcode: number;
      requiredBy: string;
      weeklySchedule: { weekDay: number; startTime: string; endTime: string }[];
      shortlistedCaregiversIds: string[];
    } = {
      startDate: formatDateToString(startDate),
      meetingDate: formatDateToString(meetingDate),
      serviceIds: effectiveServiceIds,
      careseekerZipcode: Number(effectiveZipcode),
      requiredBy: effectiveRequiredBy,
      weeklySchedule,
      shortlistedCaregiversIds,
    };

    // DO NOT add endDate for new bookings - it's only for edit mode

    if (!isAuthenticated) {
      // Store booking data in redux and redirect to signin
      dispatch(setPendingBooking(payload));
      OnClose();
      router.push("/signup");
      return;
    }

    // Proceed with booking API call if authenticated
    try {
      const result = await createBooking(payload).unwrap();
      if (isBookingResponse(result) && result.success) {
        setIsSuccessModalOpen(true);
        if (onBookingSuccess) {
          onBookingSuccess({
            startDate: formatDateToString(startDate),
            meetingDate: formatDateToString(meetingDate),
            endDate: null, // New bookings don't have endDate
            weeklySchedule,
          });
        }
      } else {
        setFormError(result.message || "Booking failed. Please try again.");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err && typeof (err as { data?: { message?: string } }).data?.message === "string") {
        setFormError((err as { data?: { message?: string } }).data?.message ?? "Booking failed. Please try again.");
      } else if (err instanceof Error && err.message) {
        setFormError(err.message);
      } else {
        setFormError("Booking failed. Please try again.");
      }
    }
  };

  // Helper for date formatting to YYYY-MM-DD without timezone conversion
  function formatDateToString(date: Date | null): string {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  function getExperienceDisplay(experience: string | number | undefined | null) {
  let experienceDisplay = "0 Years";
  if (
    experience !== null &&
    experience !== undefined &&
    !(typeof experience === "string" && experience.match(/^null|undefined|NaN/i))
  ) {
    const numericExp = typeof experience === "number"
      ? experience
      : parseFloat(String(experience).replace(/[^0-9.]/g, ""));

    if (Number.isFinite(numericExp) && numericExp >= 0) {
      if (numericExp === 99 || numericExp > 10) {
        experienceDisplay = "10+ Years";
      } else if (numericExp === 0) {
        experienceDisplay = "0 Years";
      } else {
        const years = Math.max(0, Math.floor(numericExp));
        experienceDisplay = `${years} Years`;
      }
    }
  }
  return experienceDisplay;
}

  // Helper for time formatting - FIXED VERSION
  function fmtTime(minutes: number) {
    // Clamp minutes to valid 24-hour range (0-1439)
    const clampedMinutes = Math.max(0, Math.min(1439, minutes));

    const h = Math.floor(clampedMinutes / 60);
    const m = clampedMinutes % 60;

    // Ensure hours are in 0-23 range
    const validHours = h >= 24 ? 23 : h;

    return `${validHours.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }

  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);

  // Add mouse event handlers
  const handleMouseDown = (type: "start" | "end") => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (d: Day) => (e: React.MouseEvent) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const minutes = Math.round(percentage * 24 * 60 / 15) * 15; // Round to 15-minute intervals

    if (isDragging === "start") {
      changeStartTime(d, minutes);
    } else if (isDragging === "end") {
      changeEndTime(d, minutes);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (type: "start" | "end") => (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleTouchMove = (d: Day) => (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const minutes = Math.round(percentage * 24 * 60 / 15) * 15; // Round to 15-minute intervals

    if (isDragging === "start") {
      changeStartTime(d, minutes);
    } else if (isDragging === "end") {
      changeEndTime(d, minutes);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(null);
  };

  // Add this useEffect for global mouse events
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(null);

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Add this useEffect to handle applyAll state changes
  useEffect(() => {
    // When applyAll is toggled ON, sync all selected days with the first day's time
    if (applyAll && selectedDays.length > 1) {
      const firstDay = selectedDays[0];
      const firstDaySchedule = schedule[firstDay]?.[0];

      if (firstDaySchedule) {
        setSchedule((prev) => {
          const newSchedule = { ...prev };

          // Apply first day's time to all other selected days
          selectedDays.slice(1).forEach((day) => {
            newSchedule[day] = [
              {
                id: `${day}-0`,
                start: firstDaySchedule.start,
                end: firstDaySchedule.end,
              },
            ];
          });

          return newSchedule;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyAll, selectedDays]);

  if (!isOpen) return null;

  if (!isEditMode && isSuccessModalOpen) {
    return (
      <BookSuccessful
        isModalOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          OnClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-x-0 inset-y-0 z-[3000] flex items-start justify-center bg-black/20 pt-[156px] pb-8">
      <div className="absolute inset-0" onClick={OnClose} />
      <div
        className="relative z-50 w-full max-w-2xl bg-white rounded-2xl p-4 sm:p-6 shadow-lg overflow-y-auto max-h-[75vh] mb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h1 className="text-center text-[var(--navy)] font-bold text-[26px]">
          Schedule Your Meeting With Caregivers
        </h1>
        <p className="text-center text-gray-500 text-base mt-1 mb-6">
          Pick a preferred date and set the duration to schedule your meeting
        </p>

        {/* Selected caregivers */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[var(--navy)] font-semibold text-base">Selected Caregivers</h2>
          {/* Hide Change button on /profile route or saved-caregivers tab */}
          {typeof window !== "undefined" && !window.location.pathname.includes("/recent-booking") && !window.location.pathname.includes("/profile") && (
            <button
              type="button"
              onClick={() => {
                OnClose();
              }}
              className="text-[var(--yellow)] font-semibold text-base hover:opacity-80"
            >
              Change
            </button>
          )}
        </div>
        <div className="rounded-2xl border border-[#EBEBEB] p-3 sm:p-4 mb-6">
          <div className="space-y-3">
            {selectedCaregivers.map((c, idx) => (
              <div key={c.id}>
                <div className="flex justify-between items-start">
                  {/* Left side - Avatar and Info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          c.avatar && c.avatar.trim() !== "/care-giver/boy-icon.png"
                            ? c.avatar.startsWith("http")
                              ? c.avatar
                              : `https://creative-story.s3.us-east-1.amazonaws.com/${c.avatar.replace(/^\/+/, "")}`
                            : "/care-giver/boy-icon.png"
                        }
                        alt={c.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        onError={() => {
                          // Fallback to default image if local image fails to load
                          console.error("Image failed to load");
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent overflow */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-gray-900 break-words">
                          {c.name}
                        </h3>
                        {c.isBookmarked && (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>

                      {/* Services - with proper text wrapping */}
                      {c.specialty && (
                        <p className="text-sm text-gray-600 leading-relaxed break-words">
                          {c.specialty}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right side - Experience Badge (always aligned to top-right) */}
                    <div className="flex-shrink-0 ml-3 mt-1"> {/* Added mt-1 for consistent top alignment */}
                      <div className="border border-gray-300 rounded-full px-3 py-1">
                        <span className="text-sm text-gray-700 whitespace-nowrap">
                          {getExperienceDisplay(c.experience)}
                        </span>
                      </div>
                    </div>
                </div>
                {idx < selectedCaregivers.length - 1 && (
                  <div className="border-t border-[#EBEBEB] mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className={`grid gap-4 mb-4 ${lockStartAndMeetingDates ? 'grid-cols-1 md:grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {!lockStartAndMeetingDates && (
            <>
              <div>
                <label className="block text-[var(--navy)] font-semibold text-base mb-1">
                  Preferred Meeting Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={meetingDate}
                    onChange={(date) => setMeetingDate(date)}
                    minDate={minSelectableDate}
                    dateFormat="dd-MM-yyyy"
                    className="!w-full border border-gray-400 rounded-full py-3 pl-4 lg:pr-15 text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
                    popperClassName="!z-[9999]"
                  />
                  <CalenderIcon className="absolute ml-40 lg:ml-55 top-1/2 -translate-y-1/2 opacity-70 h-[18px] w-[18px] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[var(--navy)] font-semibold text-base mb-1">
                  Service Start Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={minSelectableDate}
                    dateFormat="dd-MM-yyyy"
                    className="!w-full border border-gray-400 rounded-full py-3 pl-4 lg:pr-15 text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
                    popperClassName="!z-[9999]"
                  />
                  <CalenderIcon className="absolute ml-40 lg:ml-55 top-1/2 -translate-y-1/2 opacity-70 h-[18px] w-[18px] pointer-events-none" />
                </div>
              </div>
            </>
          )}
          {isEditMode && (
            <div>
              <label className="block text-[var(--navy)] font-semibold text-base mb-1">
                Service End Date (Optional)
              </label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={new Date()} // <-- Only allow today or future dates
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select Date"
                  popperClassName="!z-[9999]"
                  className="!w-full border border-gray-400 rounded-full py-3 pl-4  text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
                />
                  <CalenderIcon className="absolute ml-40  top-1/2 -translate-y-1/2 opacity-70 h-[18px] w-[18px] pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Service Days And Times */}
        <div className="mb-3">
          <label className="block text-[var(--navy)] font-semibold text-base mb-2">
            Set Duration
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {DAYS.map((d) => {
              const active = selectedDays.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={`px-4 py-2 rounded-lg text-sm border ${
                    active
                      ? "bg-[#233D4D] text-white border-[#233D4D]"
                      : "bg-white text-[#233D4D] border-[#E2E8F0]"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Show only one slot per selected day */}
          {selectedDays.map((d, idx) => (
            <div key={d} className="rounded-2xl border border-[#EBEBEB] p-4 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-[#233D4D] font-medium">
                  {d} -{" "}
                  <span className="text-[#7B8A9C] font-normal">{daySummary(d)}</span>
                </p>
                <button
                  type="button"
                  className="text-[#233D4D] text-lg hover:bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center"
                  onClick={() => setSelectedDays((prev) => prev.filter((day) => day !== d))}
                  title="Remove this day"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {schedule[d]?.slice(0, 1).map((r) => (
                  <div key={r.id} className="space-y-4">
                    {/* Time markers */}
                    <div className="flex items-center justify-between text-xs text-[#7B8A9C] px-1">
                      {timeMarkers.map((marker) => (
                        <span key={marker.value} className="text-center">
                          {marker.label.split(" ")[0]}<br />
                          <span className="text-[10px]">{marker.label.split(" ")[1]}</span>
                        </span>
                      ))}
                    </div>

                    {/* Custom dual-handle slider - MOUSE EVENT VERSION */}
                    <div className="relative px-2 mb-4">
                      {/* Slider container */}
                      <div
                        className="relative h-8 flex items-center cursor-pointer"
                        onMouseMove={handleMouseMove(d)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchMove={handleTouchMove(d)}
                        onTouchEnd={handleTouchEnd}
                      >
                        {/* Background track */}
                        <div className="w-full h-1 bg-gray-300 rounded-full"></div>

                        {/* Active track */}
                        <div
                          className="absolute h-1 bg-[#233D4D] rounded-full"
                          style={{
                            left: `${(r.start / (24 * 60)) * 100}%`,
                            width: `${((r.end - r.start) / (24 * 60)) * 100}%`,
                          }}
                        ></div>

                        {/* Start handle */}
                        <div
                          className="absolute w-4 h-4 bg-white border-2 border-[#233D4D] rounded-full shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                          style={{
                            left: `calc(${(r.start / (24 * 60)) * 100}% - 8px)`,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 40,
                          }}
                          onMouseDown={handleMouseDown("start")}
                          onTouchStart={handleTouchStart("start")}
                        ></div>

                        {/* End handle */}
                        <div
                          className="absolute w-4 h-4 bg-white border-2 border-[#233D4D] rounded-full shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                          style={{
                            left: `calc(${(r.end / (24 * 60)) * 100}% - 8px)`,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 40,
                          }}
                          onMouseDown={handleMouseDown("end")}
                          onTouchStart={handleTouchStart("end")}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Apply to all days checkbox - only show for first card */}
                {idx === 0 && selectedDays.length > 1 && (
                  <label className="flex items-center justify-center gap-2 text-sm text-[#233D4D] mt-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applyAll}
                      onChange={(e) => setApplyAll(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#233D4D] focus:ring-[#233D4D]"
                    />
                    Apply this time to all days
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-[#233D4D] mb-4">
          <input
            type="checkbox"
            checked={varySchedule}
            onChange={(e) => setVarySchedule(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          My Schedule may vary
        </label>

        {formError && <p className="text-red-500 text-sm mb-2">{formError}</p>}

        {/* Footer actions */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={OnClose}
            className="flex-1 bg-[#E8ECEF] text-[var(--navy)] font-semibold text-sm rounded-full py-3 hover:opacity-90 cursor-pointer"
          >
            Cancel
          </button>
          <CustomButton
            onClick={() => handleBooking(new Event("submit") as unknown as React.FormEvent)}
            disabled={isBooking || isEditing}
            className="flex-1 rounded-full font-semibold text-sm py-5 hover:opacity-90"
          >
            {isEditMode
              ? isEditing ? "Saving..." : "Save Changes"
              : isBooking ? "Scheduling..." : "Schedule Your Meeting"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCare;
