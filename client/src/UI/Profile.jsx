import { ShowAppointment } from "../components/ShowAppointment";
import { UserAppointment } from "../components/UserAppointment";
import { useAuth } from "../context/AuthContext";
import { Header } from "./Headers";
import { CgProfile } from "react-icons/cg";
import { FiMail, FiUser, FiCalendar } from "react-icons/fi";

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

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Welcome back, {userRegister?.username}!
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your account settings and view your appointments.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-28 h-28 rounded-full overflow-hidden bg-indigo-50 border-4 border-indigo-100 shadow-inner mb-6 flex items-center justify-center">
                            <CgProfile className="text-6xl text-indigo-300 absolute" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {userRegister?.username}
                        </h2>

                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
                            <FiMail className="text-indigo-500" />
                            <span>{userRegister?.email}</span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-8 border border-indigo-100">
                            <FiUser className="text-sm" />
                            <span>Role: {userRegister?.role || "Patient"}</span>
                        </div>

                        <button className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
                            Edit Profile
                        </button>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">

                            <div className="flex items-center gap-3 border-b border-gray-100 pb-5 mb-6">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <FiCalendar className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {isAdmin ? "Hospital Appointments Dashboard" : "My Appointments"}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {isAdmin ? "Review appointments scheduled for your hospital." : "Track your upcoming and past medical consultations."}
                                    </p>
                                </div>
                            </div>
                            {isAdmin && (
                                <ul className="space-y-4">
                                    {hospitalAppointments && hospitalAppointments.length > 0 ? (
                                        hospitalAppointments.map((appointment) => (
                                            <ShowAppointment
                                                key={appointment._id}
                                                patient={appointment}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                            <p className="text-gray-500 font-medium">No hospital appointments found.</p>
                                        </div>
                                    )}
                                </ul>
                            )}

                            {(!userRegister.role || userRegister.role === "patient") && (
                                <ul className="space-y-4">
                                    {userAppointment && userAppointment.length > 0 ? (
                                        userAppointment.map((appointment) => (
                                            <UserAppointment
                                                key={appointment._id}
                                                patientAppointment={appointment}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                            <p className="text-gray-500 font-medium mb-1">No appointments found.</p>
                                            <p className="text-sm text-gray-400">Book an appointment with a doctor to see it here.</p>
                                        </div>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};