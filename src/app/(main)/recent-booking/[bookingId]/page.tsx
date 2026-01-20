"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetRecentBookingsQuery } from "@/store/api/bookingApi";
import BookingDetails from "@/components/RecentBooked/BookingDetails";
import { Sidebar } from "@/components/RecentBooked/Sidebar";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";

export default function BookingDetailsPage() {
  const { bookingId } = useParams();
  const [selectedOption, setSelectedOption] = useState("Recent Booking");
  const { data, isLoading, error } = useGetRecentBookingsQuery(undefined); // fetch all bookings

  if (error) return <div className="p-6 text-red-500">Failed to load booking.</div>;

  const booking =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.data?.bookings?.find((b: any) => b.bookingId === bookingId) || null;

  if (!isLoading && !booking) return <div className="p-6">Booking not found.</div>;

  return (
    <>
      <HeroSectionCareProvider title="Booking Details" />
      <div className="min-h-screen bg-[#F8F9FA] max-w-7xl mx-auto flex flex-col md:flex-row p-4 gap-4">
        {isLoading ? (
          <>
            {/* Sidebar Skeleton */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-gray-300 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
            {/* Main Content Skeleton */}
            <div className="w-full md:w-3/4">
              {booking && <BookingDetails booking={booking} isLoading={true} />}
            </div>
          </>
        ) : (
          <>
            <Sidebar onSelect={setSelectedOption} selected={selectedOption} />
            <div className="w-full md:w-3/4">
              {booking && <BookingDetails booking={booking} />}
            </div>
          </>
        )}
      </div>
    </>
  );
}
