
import { useState } from "react";
import HospitalList from "../../../backend/hospital_data/rewari_hospitals_10.json";
import { Header } from "../UI/Headers";
import { Hospital } from "./HospitalPage";
import "./HospitalPage.css";
import axios from "axios";
import { useEffect } from "react";
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
            setError("No location provided");
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
                setError("Failed to load nearby hospitals");
            } finally {
                setLoading(false);
            }
        }
        fetchHospitals();
    }, [lat, lng]);

    if (loading) return <p>Loading nearby hospitals...</p>;
    if (error) return <p>{error}</p>;

    return (<>
        <ul className="container">
            {hospitals.map((h) => (
                <Hospital key={h._id} currHospital={h} />
            ))}

        </ul>
    </>);
};

export default NearbyHospitals;
