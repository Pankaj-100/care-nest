import { FC } from "react";

interface Booking {
  id: string;
  type: string;
  date: string;
  duration: string;
  status: "Pending" | "Accepted" | "Completed";
  src: string;
}

const bookings: Booking[] = [
  {
    id: "#15678",
    type: "Personal Care",
    date: "12 Apr 2025",
    duration: "1 Month",
    status: "Pending",
    src: "/Recent/calendar.png",
  },
  {
    id: "#15678",
    type: "Memory Care",
    date: "12 Apr 2025",
    duration: "1 Month",
    status: "Accepted",
    src: "/Recent/calendar.png",
  },
  {
    id: "#15678",
    type: "Assisted Care/Home Care",
    date: "12 Apr 2025",
    duration: "1 Month",
    status: "Completed",
    src: "/Recent/recent.png",
  },
];

const statusColor = {
  Pending: "bg-yellow-400 text-white",
  Accepted: "bg-gray-800 text-white",
  Completed: "bg-green-500 text-white",
};

const RightBookingsPanel: FC = () => {
  return (
    <div className="w-full md:w-3/4 p-6 mt-10">
      <h2 className="text-3xl font-semibold text-[var(--navy)] mb-6 font-Urbanist">
        Recent Bookings
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Pending", "Accepted", "Completed"].map((status) => (
          <button
            key={status}
            className={`px-4 py-1 rounded-full font-medium text-sm ${
              status === "All"
                ? "bg-[var(--navy)] text-white"
                : "border border-[var(--navy)] text-[var(--navy)]"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[var(--navy)] rounded-full flex items-center justify-center">
                <img src={booking.src} alt="icon" className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg text-[var(--navy)]">
                  {booking.id}
                </p>
                <p className="text-sm text-gray-600">{booking.type}</p>
                <div className="flex gap-2 mt-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1 border px-2 py-1 rounded-full text-sm font-light">
                    <img
                      src="/Recent/c.png"
                      alt="calendar"
                      className="w-3 h-3"
                    />
                    {booking.date}
                  </div>
                  <div className="flex text-sm font-light items-center gap-1 border px-2 py-1 rounded-full">
                    <img
                      src="/Recent/time.png"
                      alt="duration"
                      className="w-3 h-3"
                    />
                    {booking.duration}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-full text-md font-medium items-center ${
                      statusColor[booking.status]
                    }`}
                  >
                    {booking.status}
                  </div>
                </div>
              </div>
            </div>

            {booking.status === "Completed" ? (
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center  bg-[#F2A307] rounded-full text-lg leading-none">
                  <img
                    src="/Recent/reload.png"
                    alt="cancel"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center  bg-[#FF5C5F] rounded-full text-lg leading-none">
                  <img
                    src="/Recent/cross.png"
                    alt="cancel"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightBookingsPanel;
