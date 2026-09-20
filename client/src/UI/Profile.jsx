import { ShowAppointment } from "../components/ShowAppointment";
import { UserAppointment } from "../components/UserAppointment";
import { useAuth } from "../context/AuthContext";
import { Header } from "./Headers";
import { CgProfile } from "react-icons/cg";
import { FiMail, FiUser, FiCalendar, FiEdit3 } from "react-icons/fi";

export const Profile = () => {
    const { loading, userRegister, hospitalAppointments, userAppointment } = useAuth();

    if (loading || !userRegister) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading profile...</p>
                </div>
            </div>
        );
    }

    const isAdmin = userRegister.role === "admin";
    const appointmentsCount = isAdmin 
        ? hospitalAppointments?.length || 0 
        : userAppointment?.length || 0;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">

                {/* --- 1. TOP CENTER PROFILE SECTION --- */}
                <section className="flex justify-center w-full">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 w-full max-w-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        
                        {/* Avatar */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-indigo-50 border-2 border-indigo-100 shadow-inner flex items-center justify-center shrink-0">
                            <CgProfile className="text-6xl text-indigo-400" />
                        </div>

                        {/* User Details */}
                        <div className="flex-grow text-center sm:text-left space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
                                        {userRegister?.username}
                                    </h1>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-sm mt-1">
                                        <FiMail className="text-indigo-500 shrink-0" />
                                        <span>{userRegister?.email}</span>
                                    </div>
                                </div>

                                <div className="self-center sm:self-start">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider border border-indigo-100">
                                        <FiUser className="text-xs" />
                                        <span>{userRegister?.role || "Patient"}</span>
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-500 pt-1">
                                Manage your personal medical details, active bookings, and consultation history.
                            </p>

                            {/* Edit Action Button */}
                            <div className="pt-2">
                                <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 shadow-sm w-full sm:w-auto">
                                    <FiEdit3 className="text-sm" />
                                    <span>Edit Profile</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 2. APPOINTMENTS GRID SECTION --- */}
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    
                    {/* Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <FiCalendar className="text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    {isAdmin ? "Hospital Appointments Dashboard" : "My Appointments"}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {isAdmin
                                        ? "Review and monitor scheduled patient visits across all hospital departments."
                                        : "Track your scheduled visits and past doctor consultations."}
                                </p>
                            </div>
                        </div>

                        <span className="self-start sm:self-center px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full border border-gray-200">
                            {appointmentsCount} {appointmentsCount === 1 ? "Appointment" : "Appointments"}
                        </span>
                    </div>

                    {/* Admin View Grid */}
                    {isAdmin && (
                        hospitalAppointments && hospitalAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {hospitalAppointments.map((appointment) => (
                                    <div key={appointment._id} className="h-full flex flex-col">
                                        <ShowAppointment patient={appointment} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-500 font-semibold text-base">No hospital appointments found</p>
                                <p className="text-sm text-gray-400 mt-1">Bookings from patients will appear here automatically.</p>
                            </div>
                        )
                    )}

                    {/* Patient View Grid */}
                    {(!userRegister.role || userRegister.role === "patient") && (
                        userAppointment && userAppointment.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userAppointment.map((appointment) => (
                                    <div key={appointment._id} className="h-full flex flex-col">
                                        <UserAppointment patientAppointment={appointment} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-600 font-semibold text-base mb-1">No appointments booked yet</p>
                                <p className="text-sm text-gray-400">Search for a hospital or doctor to schedule your first visit.</p>
                            </div>
                        )
                    )}
                </section>

            </main>
        </div>
    );
};