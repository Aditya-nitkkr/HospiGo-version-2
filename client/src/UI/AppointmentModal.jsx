import { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppointmentModal = ({ closeModal, doctor, hospital }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const { userRegister } = useAuth();
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
        appointmentDate: "",
        dateOfBirth: "",
        selectSlot: "Not selected",
        reason: "",
        hospitalId: "",
        doctorId: doctor._id,
    });

    useEffect(() => {
        const fetchHospitalId = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/appointments/hospital/${hospital._id}`);
                const hospitalId = res.data;
                setPrintData((prev) => ({
                    ...prev,
                    hospitalId: hospitalId,
                }));
            } catch (err) {
                console.error("Failed to fetch hospital ID", err);
            }
        };
        fetchHospitalId();
    }, [hospital]);

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPrintData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectedSlot = (slot) => {
        setSelectedSlot(slot);
        setPrintData((prev) => ({ ...prev, selectSlot: slot }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${backendUrl}/api/appointments/create`, printData, { withCredentials: true });
            if (res.status === 201) {
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setPrintData({
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
                    appointmentDate: "",
                    dateOfBirth: "",
                    selectSlot: "Not selected",
                    reason: "",
                    hospitalId: "",
                    doctorId: doctor._id,
                });
                closeModal();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to book appointment. Please try again.");
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
                className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={closeModal}
            ></div>

            <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">

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
                    >
                        <IoIosCloseCircleOutline className="text-3xl" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">First Name *</label>
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
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Middle Name</label>
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
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Last Name</label>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Relation *</label>
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
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Mobile Number *</label>
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
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Mobile Number 2</label>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Address *</label>
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
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Age *</label>
                            <input
                                type="number"
                                name="age"
                                value={printData.age}
                                onChange={handleInput}
                                required
                                placeholder="Age"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Gender *</label>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Appointment Date *</label>
                            <input
                                type="date"
                                name="appointmentDate"
                                value={printData.appointmentDate}
                                onChange={handleInput}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Date of Birth *</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={printData.dateOfBirth}
                                onChange={handleInput}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Available Slots *</label>
                        <div className="flex flex-wrap gap-2">
                            {doctor.slots && doctor.slots.length > 0 ? (
                                doctor.slots.map((slot) => (
                                    <button
                                        key={slot.time}
                                        type="button"
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${selectedSlot === slot.time
                                                ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                                                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                                            }`}
                                        onClick={() => handleSelectedSlot(slot.time)}
                                    >
                                        {slot.time}
                                    </button>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No slots available</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Reason for Visit</label>
                        <textarea
                            name="reason"
                            rows="3"
                            value={printData.reason}
                            onChange={handleInput}
                            placeholder="Briefly describe your symptoms or reason for visit..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Confirm & Book Appointment
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.querySelector(".appointmentPortal") || document.body
    );
};