import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../UI/Headers";
import "./HospitalDetails.css";
import { FiPhoneCall } from "react-icons/fi";
import { DoctorDetails } from "../UI/DoctorDetails";
import { Footer } from "../UI/Footer";
import { getHospitalImage } from "../assets/getHospitalImage";

export const HospitalDetails = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [doctors, setDoctors] = useState([]); // Fixed: initialized as array [] instead of {}
    const [status, setStatus] = useState("loading"); // "loading" | "error" | "ready"

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
                // console.log("Fetched Data:", data);

                setHospital(data.hospital);
                setDoctors(data.doctors || []);
                setStatus("ready");
            } catch (err) {
                // Ignore aborted request errors on component unmount
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

    if (status === "loading") return <p>Loading hospital details...</p>;
    if (status === "error" || !hospital) return <p>Hospital not found.</p>;

    // Extract unique specialties safely
    const uniqueSpecialties = [
        ...new Set(doctors.map((doc) => doc.specialty)),
    ].filter(Boolean);

    return (
        <>
            <Header />
            <section className="hospital-detail-main">
                <main className="image-hospital">
                    <img src={getHospitalImage(id)} alt="" width="40%" height="50%" className="nearby-hospital-image" />
                    <div className="hospital-right-main">
                        <p className="hospital-name">{hospital.name}</p>
                        <p className="hospital-right-add">{hospital.address}</p>

                        <p className="hospital-right-spec">
                            Speciality :
                            <span
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap",
                                    marginTop: "5px",
                                }}
                            >
                                {uniqueSpecialties.map((specialty) => (
                                    <div className="hospital-right-services-btn" key={specialty}>
                                        <button className="hospital-right-services">
                                            {specialty}
                                        </button>
                                    </div>
                                ))}
                            </span>
                        </p>

                        <button className="hospital-right-btn">
                            <FiPhoneCall />
                        </button>
                    </div>
                </main>

                <div className="doctors-section-cards">
                    {doctors.length > 0 ? (
                        doctors.map((currDoctor) => (
                            <DoctorDetails
                                key={currDoctor._id}
                                doctor={currDoctor}
                                hospital={hospital}
                            />
                        ))
                    ) : (
                        <p>No doctors currently available at this hospital.</p>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};