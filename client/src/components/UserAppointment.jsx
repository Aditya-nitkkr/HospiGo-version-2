import { useState, useEffect } from "react";
import axios from "axios";
import {
    FiCalendar,
    FiClock,
    FiChevronRight,
    FiTrash2,
    FiAlertTriangle,
} from "react-icons/fi";
import { FaHospital } from "react-icons/fa";
import { AppointmentDetailModal } from "../UI/AppointmentDetailModal";
import { useAuth } from "../context/AuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const UserAppointment = ({ patientAppointment }) => {
    if (!patientAppointment) return null;
    const { deleteUserAppointment } = useAuth();

    const {
        _id,
        firstName,
        middleName,
        lastName,
        mobile,
        email,
        address,
        age,
        gender,
        appointmentDate,
        dateOfBirth,
        selectSlot,
        status,
        relation,
        reason,
        hospitalId,
    } = patientAppointment;

    const [hospital, setHospital] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                if (!hospitalId) return;
                const res = await axios.get(
                    `${backendUrl}/api/search/user/hospital/${hospitalId}`
                );
                if (res.status === 200 && res.data) {
                    setHospital(res.data.name);
                }
            } catch (error) {
                console.error("Error fetching hospital:", error);
                setHospital("Hospital Unavailable");
            }
        };
        fetchHospital();
    }, [hospitalId]);

    const getStatusBadgeStyle = (currentStatus) => {
        switch ((currentStatus || "").toLowerCase()) {
            case "accepted":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "rejected":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-amber-50 text-amber-700 border-amber-200";
        }
    };

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        const success = await deleteUserAppointment(_id);
        setIsDeleting(false);
        if (success) {
            setIsDeleteModalOpen(false);
            setIsModalOpen(false);
        }
    };

    const fullName = `${firstName || ""} ${middleName || ""} ${lastName || ""
        }`.trim();

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer flex flex-col justify-between group h-full relative"
            >
                <div>
                    {/* Header with Status Badge and Actions */}
                    <div className="flex items-center justify-between mb-4">
                        <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(
                                status
                            )}`}
                        >
                            {status || "Pending"}
                        </span>

                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-gray-400">
                                #{_id ? _id.slice(-6) : "N/A"}
                            </span>

                            {/* Delete Button (stopPropagation prevents opening detail modal) */}
                            <button
                                type="button"
                                title="Cancel Appointment"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDeleteModalOpen(true);
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                            >
                                <FiTrash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1 mb-4">
                        <h4 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {fullName || "Patient"}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <FaHospital className="text-indigo-500 shrink-0" />
                            <span className="truncate">
                                {hospital || "Loading hospital..."}
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
                        <span className="flex items-center gap-1 font-medium text-gray-800">
                            <FiClock className="text-indigo-500 shrink-0" />
                            {selectSlot || "N/A"}
                        </span>
                    </div>
                    <FiChevronRight className="text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all text-sm" />
                </div>
            </div>

            {/* Appointment Detail Modal */}
            {isModalOpen && (
                <AppointmentDetailModal
                    appointment={patientAppointment}
                    hospitalName={hospital}
                    statusBadgeStyle={getStatusBadgeStyle(status)}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={() => setIsDeleteModalOpen(true)}
                />
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
                        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                            <FiAlertTriangle className="w-5 h-5" />
                        </div>

                        <h3 className="text-base font-bold text-gray-900">
                            Cancel Appointment?
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Are you sure you want to cancel this appointment scheduled for{" "}
                            <span className="font-semibold text-gray-700">
                                {appointmentDate || "N/A"} ({selectSlot || "N/A"})
                            </span>
                            ? This action cannot be reversed.
                        </p>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 cursor-pointer disabled:opacity-50"
                            >
                                No, Keep
                            </button>
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-150 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                            >
                                {isDeleting ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};