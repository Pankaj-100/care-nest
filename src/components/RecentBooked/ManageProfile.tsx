// import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaSave, FaVenusMars } from "react-icons/fa";

export default function ManageProfile() {
  return (
    <div className="bg-[#F8F8F8] shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-6">
        <h2 className="text-3xl font-semibold leading-8 text-[var(--navy)]">Personal Information</h2>
        <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[var(--navy)] px-4 py-2 rounded-full transition duration-200 ease-in-out font-semibold">
          Save <span><img src="/Recent/file.png" /></span>
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <InputField  value="Joe Done" />
        <InputField  value="joedone@gmail.com" />
        <InputField  value="Female" />
        <InputField  value="123, street road, place name, city" />
        <InputField  value="987 654 3210" />
      </div>
    </div>
  );
}

// Reusable Input Field
function InputField({ icon, value }: { icon?: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center bg-[#F8F8F8] px-4 py-4 rounded-full  border ">
      <span className="flex-1 text-lg font-semibold text-[#667085]">{value}</span>
      <span className="text-gray-500">{icon}</span>
    </div>
  );
}
