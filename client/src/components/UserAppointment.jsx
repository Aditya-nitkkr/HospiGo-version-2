import { useState, useEffect } from "react";
import axios from "axios";
import { FiPhone, FiMail, FiMapPin, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { FaHospital } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const UserAppointment = ({ patientAppointment }) => {
    if (!patientAppointment) return null;

    const {
        _id, firstName, middleName, lastName, mobile, email,
        address, age, gender, appointmentDate, dateOfBirth,
        selectSlot, hospitalId, status, relation
    } = patientAppointment;

    const [hospital, setHospital] = useState(null);
    const [statusUpdated] = useState(status || "Pending");

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                if (!hospitalId) return;

                const res = await axios.get(`${backendUrl}/api/search/user/hospital/${hospitalId}`);
                if (res.status === 200 && res.data) {
                    setHospital(res.data.name);
                }
            } catch (error) {
                console.error("Error fetching hospital:", error);
                setHospital("Hospital Name Unavailable");
            }
        };
        fetchHospital();
    }, [hospitalId]);

    // Helper for status badge styling
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

    return (
        <li className="list-none bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 items-stretch justify-between transition-all duration-300 hover:shadow-md">

            {/* Left Column: Status & Patient Identity */}
            <div className="lg:w-1/3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <div>
                    {/* Status Badge */}
                    <div className="flex justify-between items-center mb-6">
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadgeStyle(statusUpdated)}`}>
                            {statusUpdated}
                        </span>
                    </div>

                    {/* Avatar and Name */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                           <CgProfile className="text-6xl text-indigo-300 absolute" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                {firstName || ""} {middleName || ""} {lastName || ""}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {gender || "N/A"}, {age || "?"} yrs old
                            </p>
                        </div>
                    </div>
                </div>

                {/* Appointment ID info */}
                <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-gray-400">
                    Booking ID: <span className="font-mono text-gray-600">{_id ? _id.slice(-6) : "N/A"}</span>
                </div>
            </div>

            {/* Right Column: Hospital Name & Appointment Info */}
            <div className="lg:w-2/3 flex flex-col justify-between">
                <div>
                    {/* Header with Hospital Name */}
                    <div className="flex items-center gap-2 mb-4 text-indigo-600">
                        <FaHospital className="text-xl flex-shrink-0" />
                        <h3 className="text-lg font-bold">
                            {hospital ? `Appointment at ${hospital}` : "Loading hospital details..."}
                        </h3>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <FiPhone className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Contact</span>
                                <span className="font-medium text-gray-900">{mobile || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiMail className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Email</span>
                                <span className="font-medium text-gray-900 truncate max-w-[200px] block">{email || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600 sm:col-span-2">
                            <FiMapPin className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Address</span>
                                <span className="font-medium text-gray-900">{address || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiCalendar className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Appointment Date</span>
                                <span className="font-medium text-gray-900">{appointmentDate || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiClock className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Slot Time</span>
                                <span className="font-medium text-gray-900">{selectSlot || "N/A"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiUser className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Relation</span>
                                <span className="font-medium text-gray-900">{relation || "Self"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <FiCalendar className="text-indigo-500 text-lg flex-shrink-0" />
                            <div>
                                <span className="block text-xs text-gray-400">Date of Birth</span>
                                <span className="font-medium text-gray-900">{dateOfBirth || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};