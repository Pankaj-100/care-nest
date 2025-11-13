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

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load booking.</div>;

  const booking =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.data?.bookings?.find((b: any) => b.bookingId === bookingId) || null;

  if (!booking) return <div className="p-6">Booking not found.</div>;

  return (
    <>
      <HeroSectionCareProvider title="Booking Details" />
      <div className="min-h-screen bg-[#F8F9FA] max-w-7xl mx-auto flex flex-col md:flex-row p-4 gap-4">
        <Sidebar onSelect={setSelectedOption} selected={selectedOption} />
        <div className="w-full md:w-3/4">
          <BookingDetails booking={booking} />
        </div>
      </div>
    </>
  );
}
