import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppointmentModal = ({ closeModal, doctor, hospital }) => {
  const { userRegister } = useAuth();

  const todayStr = new Date().toISOString().split("T")[0];

  const [slots, setSlots] = useState(doctor.slots || []);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [printData, setPrintData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    relation: "",
    mobile: "",
    mobile2: "",
    email: userRegister?.email || "",
    address: "",
    age: "",
    gender: "",
    appointmentDate: todayStr,
    dateOfBirth: "",
    selectSlot: "",
    reason: "",
    hospitalId: hospital?._id || "",
    doctorId: doctor._id,
  });

  // Fetch real-time slots whenever the appointment date changes
  const fetchSlotsForDate = useCallback(
    async (selectedDate) => {
      if (!selectedDate || !doctor?._id || !hospital?._id) return;
      try {
        setLoadingSlots(true);
        const res = await axios.get(`${backendUrl}/api/appointments/slots`, {
          params: {
            doctorId: doctor._id,
            hospitalId: hospital._id,
            date: selectedDate,
          },
        });
        setSlots(res.data.slots || []);
      } catch (err) {
        console.error("Failed to fetch slots for date:", err);
        toast.error("Unable to load latest slots for this date");
      } finally {
        setLoadingSlots(false);
      }
    },
    [doctor._id, hospital._id]
  );

  useEffect(() => {
    fetchSlotsForDate(printData.appointmentDate);
  }, [printData.appointmentDate, fetchSlotsForDate]);

  // Lock body scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInput = (event) => {
    const { name, value } = event.target;

    // Reset chosen slot if date changes to prevent booking invalid slots
    if (name === "appointmentDate") {
      setPrintData((prev) => ({
        ...prev,
        appointmentDate: value,
        selectSlot: "",
      }));
      return;
    }

    setPrintData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectedSlot = (slotTime) => {
    setPrintData((prev) => ({ ...prev, selectSlot: slotTime }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!printData.selectSlot) {
      toast.warning("Please select an available appointment slot.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${backendUrl}/api/appointments/create`,
        printData,
        { withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success(res.data.message || "Appointment booked successfully!", {
          position: "top-center",
          autoClose: 4000,
        });
        closeModal();
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Patient Appointment Details
            </h2>
            <p className="text-sm text-indigo-600 font-medium mt-0.5">
              Booking with {doctor.name}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200/60"
            aria-label="Close modal"
          >
            <IoIosCloseCircleOutline className="text-3xl" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={printData.firstName}
                onChange={handleInput}
                required
                placeholder="First name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={printData.middleName}
                onChange={handleInput}
                placeholder="Middle name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={printData.lastName}
                onChange={handleInput}
                placeholder="Last name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Row 2: Relation & Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Relation *
              </label>
              <input
                type="text"
                name="relation"
                value={printData.relation}
                onChange={handleInput}
                required
                placeholder="e.g. Self, Father"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobile"
                value={printData.mobile}
                onChange={handleInput}
                required
                placeholder="Primary mobile"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Mobile Number 2
              </label>
              <input
                type="tel"
                name="mobile2"
                value={printData.mobile2}
                onChange={handleInput}
                placeholder="Optional mobile"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Row 3: Address, Age, Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={printData.address}
                onChange={handleInput}
                required
                placeholder="Residential address"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Age *
              </label>
              <input
                type="number"
                name="age"
                min="0"
                max="120"
                value={printData.age}
                onChange={handleInput}
                required
                placeholder="Age"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Gender *
              </label>
              <select
                name="gender"
                value={printData.gender}
                onChange={handleInput}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 4: Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Appointment Date *
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={printData.appointmentDate}
                onChange={handleInput}
                min={todayStr}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={printData.dateOfBirth}
                onChange={handleInput}
                max={todayStr}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Row 5: Available Slots */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Available Slots *
              </label>
              {loadingSlots && (
                <span className="text-xs text-indigo-600 animate-pulse font-medium">
                  Checking real-time slots...
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {loadingSlots ? (
                <div className="py-3 text-sm text-gray-400 italic">
                  Fetching slots for {printData.appointmentDate}...
                </div>
              ) : slots.length > 0 ? (
                slots.map((slot) => {
                  const isFull = slot.capacity <= 0;
                  const isSelected = printData.selectSlot === slot.time;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={isFull}
                      onClick={() => handleSelectedSlot(slot.time)}
                      className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl text-sm transition-all border ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300"
                          : isFull
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                          : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-bold tracking-wide">{slot.time}</span>
                      <span
                        className={`text-[11px] font-medium mt-0.5 ${
                          isSelected ? "text-indigo-100" : "text-gray-500"
                        }`}
                      >
                        {isFull ? "Fully Booked" : `${slot.capacity} slots left`}
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 py-2">
                  No slots scheduled on this date.
                </p>
              )}
            </div>
          </div>

          {/* Row 6: Reason */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Reason for Visit
            </label>
            <textarea
              name="reason"
              rows="3"
              value={printData.reason}
              onChange={handleInput}
              placeholder="Briefly describe your symptoms or reason for visit..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || loadingSlots || !printData.selectSlot}
              className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Booking Appointment..." : "Confirm & Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.querySelector(".appointmentPortal") || document.body
  );
};