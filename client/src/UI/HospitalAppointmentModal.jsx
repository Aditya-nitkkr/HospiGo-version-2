import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiCalendar,
    FiClock,
    FiUser,
    FiCheck,
    FiX,
    FiRotateCcw,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const HospitalAppointmentModal = ({ patient, status, onStatusChange, onClose }) => {
    const [loadingAction, setLoadingAction] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status || "Pending");

    const {
        _id,
        firstName,
        middleName,
        lastName,
        mobile,
        mobile2,
        email,
        address,
        age,
        gender,
        appointmentDate,
        dateOfBirth,
        selectSlot,
        relation,
        reason,
    } = patient;

    // Lock body scroll when modal is active
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const fullName = `${firstName || ""} ${middleName || ""} ${lastName || ""}`.trim();
    const isDecided = currentStatus === "Accepted" || currentStatus === "Rejected";

    const updateStatus = async (newStatus) => {
        try {
            setLoadingAction(true);
            const res = await axios.put(
                `${backendUrl}/api/appointments/admin/update-status/${_id}`,
                { status: newStatus },
                { withCredentials: true }
            );

            if (res.status === 200 || res.status === 204) {
                setCurrentStatus(newStatus);
                onStatusChange(newStatus);
                toast.success(`Appointment marked as ${newStatus}`);
            }
        } catch (error) {
            console.error("Failed to update status:", error);
            toast.error(error.response?.data?.message || "Failed to update appointment status");
        } finally {
            setLoadingAction(false);
        }
    };

    const getStatusBadgeStyle = (stat) => {
        switch ((stat || "").toLowerCase()) {
            case "accepted":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "rejected":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-amber-50 text-amber-700 border-amber-200";
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
                {/* Modal Topbar */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadgeStyle(currentStatus)}`}>
                            {currentStatus}
                        </span>
                        <span className="text-xs font-mono text-gray-400">
                            Booking ID: #{_id ? _id.slice(-8) : "N/A"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {isDecided && (
                            <button
                                type="button"
                                disabled={loadingAction}
                                onClick={() => updateStatus("Pending")}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-indigo-600 bg-white border border-gray-200 hover:border-indigo-200 px-3 py-1.5 rounded-xl transition-all shadow-sm disabled:opacity-50"
                            >
                                <FiRotateCcw /> Revert
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200/60"
                        >
                            <IoIosCloseCircleOutline className="text-3xl" />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-gray-700">
                    {/* Patient Card */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400 shrink-0">
                            <CgProfile className="text-4xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                                {fullName}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {gender || "N/A"}, {age || "?"} years old • Relation:{" "}
                                <span className="font-semibold text-gray-700">{relation || "Self"}</span>
                            </p>
                        </div>
                    </div>

                    {/* Slot Highlight Pill */}
                    <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 sm:p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="p-2 bg-indigo-100/70 text-indigo-600 rounded-xl">
                                    <FiCalendar className="text-lg shrink-0" />
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 font-medium">Scheduled Date</span>
                                    <span className="font-bold text-gray-900">{appointmentDate || "N/A"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="p-2 bg-indigo-100/70 text-indigo-600 rounded-xl">
                                    <FiClock className="text-lg shrink-0" />
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 font-medium">Selected Slot</span>
                                    <span className="font-bold text-gray-900">{selectSlot || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient Contact & Medical Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <FiPhone className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Primary Contact</span>
                                <span className="font-medium text-gray-900">{mobile || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FiPhone className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Alternate Contact</span>
                                <span className="font-medium text-gray-900">{mobile2 || "None"}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FiMail className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Email</span>
                                <span className="font-medium text-gray-900 truncate block max-w-[200px]">
                                    {email || "N/A"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FiUser className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Date of Birth</span>
                                <span className="font-medium text-gray-900">{dateOfBirth || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 sm:col-span-2">
                            <FiMapPin className="text-indigo-500 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Residential Address</span>
                                <span className="font-medium text-gray-900">{address || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Reason for Visit */}
                    {reason && (
                        <div className="pt-2 border-t border-gray-100">
                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                                Reason for Consultation
                            </span>
                            <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100 leading-relaxed">
                                {reason}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Controls: Accept & Reject */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        disabled={loadingAction || currentStatus === "Accepted"}
                        onClick={() => updateStatus("Accepted")}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <FiCheck className="text-lg" />
                        {currentStatus === "Accepted" ? "Appointment Accepted" : "Accept Appointment"}
                    </button>

                    <button
                        type="button"
                        disabled={loadingAction || currentStatus === "Rejected"}
                        onClick={() => updateStatus("Rejected")}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <FiX className="text-lg" />
                        {currentStatus === "Rejected" ? "Appointment Rejected" : "Reject Appointment"}
                    </button>
                </div>
            </div>
        </div>,
        document.querySelector(".appointmentPortal") || document.body
    );
};