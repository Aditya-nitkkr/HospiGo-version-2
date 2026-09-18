import { useState } from "react";
import { AppointmentModal } from "./AppointmentModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";

export const DoctorDetails = ({ doctor, hospital }) => {
    const [showModal, setShowModal] = useState(false);
    const navigator = useNavigate();
    const { isAuthenticated } = useAuth();

    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);

    const redirectToLogin = () => {
        navigator("/signup");
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">

            <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 flex-shrink-0 overflow-hidden border border-indigo-100 shadow-sm">
                    {doctor.photo ? (
                        <img
                            className="w-full h-full object-cover"
                            src={doctor.photo}
                            alt={doctor.name}
                        />
                    ) : (
                        <FaUserDoctor className="text-3xl mt-2" />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-700 bg-indigo-50 inline-block px-3 py-1 rounded-full mt-1.5 border border-indigo-100">
                        {doctor.specialty}
                    </p>
                </div>
            </div>



            <div className="mt-auto pt-4 border-t border-gray-50">
                <button
                    className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-md transition-all duration-300 active:scale-[0.98]"
                    onClick={isAuthenticated ? openModal : redirectToLogin}
                >
                    Book an Appointment
                </button>
            </div>
            {isAuthenticated && showModal && (
                <AppointmentModal
                    closeModal={closeModal}
                    doctor={doctor}
                    hospital={hospital}
                />
            )}

        </div>
    );
};