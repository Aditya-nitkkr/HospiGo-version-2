import { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const UserAppointment = ({ patientAppointment }) => {
    const {
        _id, firstName, middleName, lastName, mobile, email,
        address, age, gender, appointmentDate, dateOfBirth,
        selectSlot, hospitalId, status
    } = patientAppointment;

    // FIX: Use array destructuring for useState and initialize as null
    const [hospital, setHospital] = useState(null);
    const [statusUpdated, setStatusUpdated] = useState(status || "Pending");

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                if (!hospitalId) return; // Prevent calling API if hospitalId is missing

                const res = await axios.get(`${backendUrl}/api/search/user/hospital/${hospitalId}`);
                // console.log(res);
                // console.log("Fetched hospital:", res.data);

                // FIX: Axios returns data inside the 'data' property
                if (res.status === 200) {
                    const hospitalName = res.data.name;
                    // console.log(res.data.name);
                    setHospital(hospitalName);
                }
            } catch (error) {
                console.error("Error fetching hospital:", error);
            }
        }
        fetchHospital();
        // FIX: Dependency array should watch hospitalId, not statusUpdated
    }, [hospitalId]);

    return (
        <li className="profile-list" key={_id}>
            <div className="patient-left-content">
                <p className={`patient-status ${statusUpdated.toLowerCase()}`}>{statusUpdated}</p>
                <div className="patient-left-content-div">
                    <figure className="profile-border">
                        <img src="/profile-default.png" className="profile-default-img" alt="profile-default-image" width="50%" />
                    </figure>
                    <h2 className="patient-name">{firstName} {middleName} {lastName}</h2>
                </div>
            </div>

            {/* FIX: Only render right content once 'hospital' state is successfully fetched */}
            {hospital && (
                <div className="patient-right-content">
                    <h3 className="patient-details">Appointment in {hospital}</h3>
                    <div className="patient-info">
                        <p className="patient-info-item"><strong className="patient-info-label">Name:</strong> <span className="patient-info-value">{firstName}</span></p>
                        <p className="patient-info-item"><strong className="patient-info-label">Contact:</strong> <span className="patient-info-value">{mobile}</span></p>
                        <p className="patient-info-item"><strong className="patient-info-label">Email:</strong> <span className="patient-info-value">{email}</span></p>
                        <p className="patient-info-item"><strong className="patient-info-label">Address:</strong> <span className="patient-info-value">{address}</span></p>
                        <p className="patient-info-item"><strong className="patient-info-label">Age:</strong> <span className="patient-info-value">{age}</span></p>
                        <p className="patient-info-item"><strong className="patient-info-label">Gender:</strong> <span className="patient-info-value">{gender}</span></p>
                        <p className="patient-info-item"><strong className="patient-info-label">Appointment date:</strong> <span className="patient-info-value">{appointmentDate}</span></p>
                        <p className="patient-info-item"><strong className="patient-info-label">Date of Birth:</strong> <span className="patient-info-value">{dateOfBirth}</span></p>
                        <p className="patient-info-item"><strong className="patient-info-label">Slot Time:</strong> <span className="patient-info-value">{selectSlot}</span></p>
                    </div>
                </div>
            )}
        </li>
    )
}