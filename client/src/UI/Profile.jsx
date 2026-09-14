import { ShowAppointment } from "../components/ShowAppointment";
import { UserAppointment } from "../components/UserAppointment";
import { useAuth } from "../context/AuthContext";
import { Header } from "./Headers";
import "./profile.css";

export const Profile = () => {
    const { loading, userRegister, hospitalAppointments, userAppointment } = useAuth();
    
    console.log("hospitalAppointments: ", typeof hospitalAppointments);
    // console.log("user Appointments: ", userAppointment);
    
    if (loading || !userRegister) {
        return <div className="profile-main"><p>Loading profile...</p></div>;
    }

    return (
        <>
            <Header />
            <div className="profile-main" >
                <h2 className="profile-heading">Welcome {userRegister?.username}</h2>
                <div className="main-container">
                    <div className="profile-container-main">
                        <img
                            src="/user-default.png"
                            alt="Profile"
                            className="profile-image"
                        />
                        <h3 className="profile-username">{userRegister?.username}</h3>
                        <p className="profile-email" >{userRegister?.email}</p>
                        <p className="profile-role">Role: {userRegister?.role || "Patient"} </p>
                        <button className="edit-profile-btn" >
                            Edit Profile
                        </button>
                    </div>
                    
                    {/* Admin Appointments */}
                    {userRegister.role === "admin" && (
                        <ul>
                            {/* Make sure to add a safety check here too! */}
                            {hospitalAppointments && hospitalAppointments.length > 0 ? (
                                hospitalAppointments.map((appointment) => (
                                    <ShowAppointment 
                                        className="profile-appointment" 
                                        key={appointment._id} 
                                        patient={appointment} 
                                    />
                                ))
                            ) : (
                                <p>No hospital appointments found.</p>
                            )}
                        </ul>
                    )}
                    
                    {/* Patient Appointments */}
                    {userRegister.role === "patient" && (
                        <ul>
                            {/* 1. Check if userAppointment exists (not null) */}
                            {/* 2. Map through the array directly */}
                            {userAppointment && userAppointment.length > 0 ? (
                                userAppointment.map((appointment) => (
                                    <UserAppointment 
                                        className="profile-appointment" 
                                        key={appointment._id} // Use the actual DB ID as the key
                                        patientAppointment={appointment} 
                                    />
                                ))
                            ) : (
                                <p>No appointments found.</p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}