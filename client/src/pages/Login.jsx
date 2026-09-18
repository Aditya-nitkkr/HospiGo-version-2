import { useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Login = () => {
    const [showPassWord1, setShowPassword1] = useState(false);
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { login, setUserRegistered } = useAuth();

    // handle auto submit
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${backendUrl}/api/auth/login`, userLogin, {
                withCredentials: true,
            });
            
            const userLoggedIn = res.data.user;
            setUserRegistered(userLoggedIn);
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

        } catch (err) {
            console.log(err.response)
            toast.warn(err.response?.data?.message || "Login failed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        // reset the input field
        setUserLogin({
            email: "",
            password: ""
        });
    }

    // handle the input given by the user
    const handleInput = (event) => {
        const { name, value } = event.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl space-y-6">
                
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Please enter your details to sign in.
                    </p>
                </div>

                <form onSubmit={handleOnSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            autoComplete="off"
                            required
                            value={userLogin.email}
                            onChange={handleInput}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={showPassWord1 ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your Password"
                                autoComplete="off"
                                required
                                value={userLogin.password}
                                onChange={handleInput}
                                className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-colors"
                            />
                            <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                onClick={() => setShowPassword1(!showPassWord1)}
                            >
                                {showPassWord1 ? <ImEye size={18} /> : <ImEyeBlocked size={18} />}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Log in
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => { window.location.href = `${backendUrl}/api/auth/google`; }}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <FcGoogle size={20} />
                            <span>Log in with Google</span>
                        </button>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <NavLink to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all">
                            Sign up
                        </NavLink>
                    </p>
                </form>
            </div>
        </section>
    );
};