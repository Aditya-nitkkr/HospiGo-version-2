import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../UI/Headers";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { DoctorDetails } from "../UI/DoctorDetails";
import { Footer } from "../UI/Footer";
import { getHospitalImage } from "../assets/getHospitalImage";

export const HospitalDetails = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [doctors, setDoctors] = useState([]); 
    const [status, setStatus] = useState("loading"); 

    useEffect(() => {
        const controller = new AbortController();

        const fetchHospital = async () => {
            setStatus("loading");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/search/hospital/${id}`,
                    { signal: controller.signal }
                );

                const data = response.data;
                setHospital(data.hospital);
                setDoctors(data.doctors || []);
                setStatus("ready");
            } catch (err) {
                if (axios.isCancel(err)) return;
                console.error("Axios fetch error:", err);
                setStatus("error");
            }
        };

        fetchHospital();

        return () => {
            controller.abort();
        };
    }, [id]);

    // Loading State
    if (status === "loading") return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading hospital details...</p>
            </div>
            <Footer />
        </div>
    );

    // Error State
    if (status === "error" || !hospital) return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center px-4">
                <div className="bg-red-50 text-red-700 px-8 py-6 rounded-2xl max-w-md text-center border border-red-100 shadow-sm">
                    <p className="font-bold text-lg mb-1">Hospital Not Found</p>
                    <p>We couldn't load the details for this hospital. Please try again later.</p>
                </div>
            </div>
            <Footer />
        </div>
    );

    // Extract unique specialties safely
    const uniqueSpecialties = [
        ...new Set(doctors.map((doc) => doc.specialty)),
    ].filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 w-full">
                
                {/* Hospital Hero Card */}
                <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-5/12 h-64 lg:h-auto relative bg-gray-100">
                        <img 
                            src={getHospitalImage(id)} 
                            alt={hospital.name} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="p-8 lg:p-12 lg:w-7/12 flex flex-col justify-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            {hospital.name}
                        </h1>
                        <div className="flex items-start gap-2 text-gray-600 mb-8">
                            <IoLocationOutline className="text-xl flex-shrink-0 text-indigo-500 mt-0.5" />
                            <p className="text-lg leading-relaxed">{hospital.address}</p>
                        </div>

                        {uniqueSpecialties.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                    Specialties Available
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {uniqueSpecialties.map((specialty) => (
                                        <span 
                                            key={specialty}
                                            className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-100"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all duration-300">
                            <FiPhoneCall className="text-xl" />
                            Contact Hospital
                        </button>
                    </div>
                </section>

                {/* Doctors Section */}
                <section>
                    <div className="border-b border-gray-200 pb-5 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Our Specialists</h2>
                        <p className="text-gray-500 mt-1">Book an appointment with our highly qualified doctors.</p>
                    </div>
                    
                    {doctors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {doctors.map((currDoctor) => (
                                <DoctorDetails
                                    key={currDoctor._id}
                                    doctor={currDoctor}
                                    hospital={hospital}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                            <p className="text-gray-500 text-lg">No doctors are currently listed for this hospital.</p>
                        </div>
                    )}
                </section>

                {/* Emergency Services Banner */}
                <section className="bg-red-50 rounded-3xl overflow-hidden flex flex-col md:flex-row border border-red-100 shadow-sm">
                    <div className="p-8 lg:p-12 md:w-3/5 flex flex-col justify-center">
                        <h2 className="text-3xl font-extrabold text-red-700 mb-8 tracking-tight">
                            Emergency Services
                        </h2>
                        
                        <ul className="space-y-6 mb-10">
                            <li className="flex flex-col">
                                <span className="text-lg font-bold text-gray-900">24/7 Trauma Care</span>
                                <span className="text-gray-600 mt-1">Immediate evaluation and surgical intervention for severe injuries.</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-lg font-bold text-gray-900">Cardiac Emergency</span>
                                <span className="text-gray-600 mt-1">Rapid response for chest pain, heart attacks, and cardiac arrest.</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-lg font-bold text-gray-900">Critical Care Unit (ICU)</span>
                                <span className="text-gray-600 mt-1">Advanced monitoring and intensive care for life-threatening conditions.</span>
                            </li>
                        </ul>

                        <div className="bg-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-red-100 shadow-sm">
                            <p className="text-gray-700 font-semibold text-lg">Need Immediate Help?</p>
                            <button className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md">
                                Call: +1 (800) 123-4567
                            </button>
                        </div>
                    </div>
                    
                    <div className="md:w-2/5 h-64 md:h-auto">
                        <img
                            src="/emergency-services.jpg"
                            alt="Ambulance"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </section>
                
            </main>
            <Footer />
        </div>
    );
};