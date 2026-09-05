import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const OAuthSuccess = () => {
    const { login, setUserRegistered } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/auth/status`, {
                    withCredentials: true
                });
                setUserRegistered(res.data.user);
                if (res.status === 200) {
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


                    login();
                    navigate("/");
                    // console.log("data", res.data.user);
                } else {
                    navigate("/login");
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                navigate("/login");
            }
        };

        checkAuth();
    }, []);

    return <p>Logging in via Google...</p>;
};
