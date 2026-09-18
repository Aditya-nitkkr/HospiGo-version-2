import { useState, useEffect } from "react";
import { Hospital } from "./HospitalPage";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const NearbyHospitals = () => {
    const [searchParams] = useSearchParams();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(() => {
        if (!lat || !lng) {
            setError("No location provided to search.");
            setLoading(false);
            return;
        }

        async function fetchHospitals() {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/search/nearby`,
                    { params: { lat, lng } }
                );
                setHospitals(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                setError("Failed to load nearby hospitals. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchHospitals();
    }, [lat, lng]);

    // Loading State
    if (loading) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium animate-pulse">Finding hospitals near you...</p>
        </div>
    );

    // Error State
    if (error) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="bg-red-50 text-red-700 px-8 py-6 rounded-2xl max-w-md text-center border border-red-100 shadow-sm">
                <p className="font-bold text-lg mb-1">Oops!</p>
                <p>{error}</p>
            </div>
        </div>
    );

    // Success State
    return (
        <section className="bg-gray-50 min-h-screen py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Page Header */}
                <div className="mb-10 text-center sm:text-left border-b border-gray-200 pb-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Hospitals Near You
                    </h1>
                    <p className="mt-2 text-gray-500 text-lg">
                        Showing top results based on your selected location.
                    </p>
                </div>

                {hospitals.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🏥</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Hospitals Found</h3>
                        <p className="text-gray-500">We couldn't find any hospitals in this specific area. Try searching a different location.</p>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hospitals.map((h) => (
                            <Hospital key={h._id} currHospital={h} />
                        ))}
                    </ul>
                )}
                
            </div>
        </section>
    );
};

export default NearbyHospitals;