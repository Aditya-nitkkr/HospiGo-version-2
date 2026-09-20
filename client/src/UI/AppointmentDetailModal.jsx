import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReactDOM from "react-dom";
import {
    FiCalendar, FiClock, FiMapPin, FiPhone,
    FiMail, FiUser
} from "react-icons/fi";
import { FaHospital } from "react-icons/fa6";

// Modal Component rendered at Portal level
export const AppointmentDetailModal = ({ appointment, hospitalName, statusBadgeStyle, onClose }) => {
    const {
        _id, firstName, middleName, lastName, mobile, email,
        address, age, gender, appointmentDate, dateOfBirth,
        selectSlot, status, relation, reason
    } = appointment;    
    

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const fullName = `${firstName || ""} ${middleName || ""} ${lastName || ""}`.trim();

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusBadgeStyle}`}>
                            {status || "Pending"}
                        </span>
                        <span className="text-xs font-mono text-gray-400">
                            Booking ID: #{_id ? _id.slice(-8) : "N/A"}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200/60"
                    >
                        <IoIosCloseCircleOutline className="text-3xl" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-gray-700">

                    {/* Patient Overview */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400 shrink-0">
                            <CgProfile className="text-4xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                                {fullName}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {gender || "N/A"}, {age || "?"} years old • Relation: <span className="font-semibold text-gray-700">{relation || "Self"}</span>
                            </p>
                        </div>
                    </div>

                    {/* Hospital & Timing Box */}
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 sm:p-5 space-y-3">
                        <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
                            <FaHospital className="text-lg shrink-0" />
                            <span>{hospitalName || "Hospital Details Unavailable"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2 border-t border-indigo-100/60">
                            <div className="flex items-center gap-2 text-gray-700">
                                <FiCalendar className="text-indigo-600 shrink-0" />
                                <span><strong>Date:</strong> {appointmentDate || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <FiClock className="text-indigo-600 shrink-0" />
                                <span><strong>Time Slot:</strong> {selectSlot || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Patient Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <FiPhone className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Phone</span>
                                <span className="font-medium text-gray-900">{mobile || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FiMail className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Email</span>
                                <span className="font-medium text-gray-900 truncate block max-w-[200px]">{email || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FiUser className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Date of Birth</span>
                                <span className="font-medium text-gray-900">{dateOfBirth || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FiMapPin className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Residential Address</span>
                                <span className="font-medium text-gray-900">{address || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Reason for Visit */}
                    {reason && (
                        <div className="pt-4 border-t border-gray-100">
                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                Reason for Consultation
                            </span>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed">
                                {reason}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm rounded-xl transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.querySelector(".appointmentPortal") || document.body
    );
};

