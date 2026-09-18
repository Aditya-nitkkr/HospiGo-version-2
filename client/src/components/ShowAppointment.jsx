import { useState } from "react";
import axios from "axios";
import { FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiUser, FiCheck, FiX, FiRotateCcw } from "react-icons/fi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const ShowAppointment = ({ patient }) => {
    const { firstName, middleName, lastName, mobile, email, address, age, gender, appointmentDate, dateOfBirth, selectSlot, status } = patient;

    const [statusUpdated, setStatusUpdated] = useState(status || "Pending");
    const isDisabled = statusUpdated === "Accepted" || statusUpdated === "Rejected";

    const handleAcceptance = async () => {
        try {
            await axios.put(`${backendUrl}/api/appointments/admin/update-status/${patient._id}`, {
                status: "Accepted"
            }, { withCredentials: true });
            setStatusUpdated("Accepted");
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleRejection = async () => {
        try {
            await axios.put(`${backendUrl}/api/appointments/admin/update-status/${patient._id}`, {
                status: "Rejected"
            }, { withCredentials: true });
            setStatusUpdated("Rejected");
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleRevertBtn = async () => {
        try {
            await axios.put(`${backendUrl}/api/appointments/admin/update-status/${patient._id}`, {
                status: "Pending"
            }, { withCredentials: true });
            setStatusUpdated("Pending");
        } catch (error) {
            console.error("Failed to revert status:", error);
        }
    };

    // Helper for status badge styling
    const getStatusBadgeStyle = (currentStatus) => {
        switch (currentStatus.toLowerCase()) {
            case "accepted":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "rejected":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-amber-50 text-amber-700 border-amber-200";
        }
    };

    return (
        <li className="list-none bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 items-stretch justify-between transition-all duration-300 hover:shadow-md">
            
            {/* Left Column: Patient Identity & Status */}
            <div className="lg:w-1/3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <div>
                    {/* Status Badge */}
                    <div className="flex justify-between items-center mb-6">
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadgeStyle(statusUpdated)}`}>
                            {statusUpdated}
                        </span>

                        {isDisabled && (
                            <button 
                                type="button" 
                                onClick={handleRevertBtn}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <FiRotateCcw /> Revert
                            </button>
                        )}
                    </div>

                    {/* Avatar and Name */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                            <img 
                                src="/profile-default.png" 
                                alt="Patient Avatar" 
                                className="w-10 h-10 object-contain opacity-80" 
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                {firstName} {middleName} {lastName}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {gender}, {age} yrs old
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Info summary if needed */}
                <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-gray-400">
                    Appointment ID: <span className="font-mono text-gray-600">{patient._id.slice(-6)}</span>
                </div>
            </div>

            {/* Right Column: Patient Information & Actions */}
            <div className="lg:w-2/3 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        Appointment Information
                    </h3>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
                        <div className="flex items-center gap-3 text-gray-600">
                            <FiPhone className="text-indigo-505 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Contact</span>
                                <span className="font-medium text-gray-900">{mobile}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiMail className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Email</span>
                                <span className="font-medium text-gray-900 truncate max-w-[200px] block">{email}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600 sm:col-span-2">
                            <FiMapPin className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Address</span>
                                <span className="font-medium text-gray-900">{address}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiCalendar className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Appointment Date</span>
                                <span className="font-medium text-gray-900">{appointmentDate}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiClock className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Slot Time</span>
                                <span className="font-medium text-gray-900">{selectSlot}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiUser className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Relation</span>
                                <span className="font-medium text-gray-900">{patient.relation || "Self"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiCalendar className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Date of Birth</span>
                                <span className="font-medium text-gray-900">{dateOfBirth}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acceptance / Rejection Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                    <button 
                        type="button" 
                        onClick={handleAcceptance} 
                        disabled={isDisabled}
                        className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-sm ${
                            isDisabled 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                                : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md"
                        }`}
                    >
                        <FiCheck className="text-lg" /> Accept Appointment
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={handleRejection} 
                        disabled={isDisabled}
                        className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-sm ${
                            isDisabled 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                                : "bg-red-600 text-white hover:bg-red-700 hover:shadow-md"
                        }`}
                    >
                        <FiX className="text-lg" /> Reject Appointment
                    </button>
                </div>
            </div>
        </li>
    );
};