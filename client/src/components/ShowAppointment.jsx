import { useState } from "react";
import { FiCalendar, FiClock, FiChevronRight, FiUser } from "react-icons/fi";
import { HospitalAppointmentModal } from "../UI/HospitalAppointmentModal";

export const ShowAppointment = ({ patient }) => {
    if (!patient) return null;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(patient.status || "Pending");

    const {
        _id,
        firstName,
        middleName,
        lastName,
        age,
        gender,
        appointmentDate,
        selectSlot,
        relation
    } = patient;

    const fullName = `${firstName || ""} ${middleName || ""} ${lastName || ""}`.trim();

    const getStatusBadgeStyle = (status) => {
        switch ((status || "").toLowerCase()) {
            case "accepted":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "rejected":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-amber-50 text-amber-700 border-amber-200";
        }
    };

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer flex flex-col justify-between group h-full"
            >
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(currentStatus)}`}>
                            {currentStatus}
                        </span>
                        <span className="text-[11px] font-mono text-gray-400">
                            #{_id ? _id.slice(-6) : "N/A"}
                        </span>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {fullName || "Unnamed Patient"}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                            <FiUser className="text-indigo-500 shrink-0" />
                            <span>
                                {gender || "N/A"}, {age || "?"} yrs • {relation || "Self"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <FiCalendar className="text-indigo-500 shrink-0" />
                            {appointmentDate || "N/A"}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-gray-800">
                            <FiClock className="text-indigo-500 shrink-0" />
                            {selectSlot || "N/A"}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-indigo-600 font-medium group-hover:translate-x-0.5 transition-transform">
                        <span>Review</span>
                        <FiChevronRight className="text-sm" />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <HospitalAppointmentModal
                    patient={patient}
                    status={currentStatus}
                    onStatusChange={setCurrentStatus}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};