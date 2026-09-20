import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";


const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_PUBLIC_KEY;

export const Contact = () => {
    // const { currentUser } = useAuthMock();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { userRegister } = useAuth();

    const [userQuery, setUserQuery] = useState({
        username: userRegister?.username || "",
        category: "General Inquiry",
        message: "",
    });
    // console.log(userRegister?.username);
    useEffect(() => {
        if (userRegister?.username) {
            setUserQuery((prev) => ({
                ...prev,
                username: userRegister.username,
            }));
        }
    }, [userRegister]);
    

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserQuery((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnsubmit = async (e) => {
        e.preventDefault();

        if (!userRegister?.email) {
            toast.error("You must be logged in to send a message.");
            return;
        }

        setIsSubmitting(true);

        const submissionTime = new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        });

        // Parameters matching your EmailJS template variables
        const templateParams = {
            name: userQuery.username.trim(),
            email: userRegister.email,
            category: userQuery.category,
            message: userQuery.message.trim(),
            time: submissionTime,
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, {
                publicKey: publicKey,
            });

            toast.success("Message sent successfully!", {
                position: "top-center",
                autoClose: 4000,
            });

            // Reset editable inputs
            setUserQuery((prev) => ({
                ...prev,
                message: "",
                category: "General Inquiry",
            }));
        } catch (error) {
            console.error("EmailJS submission failed:", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 md:p-10 rounded-2xl shadow-xl space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Have a question, feedback, or need help? Send us a note below.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleOnsubmit} className="space-y-5">
                    {/* Authenticated Email (Read-only) */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Your Verified Email
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                            <input
                                type="email"
                                id="email"
                                value={userRegister?.email || ""}
                                readOnly
                                className="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 sm:text-sm cursor-not-allowed select-none focus:outline-none"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-gray-400 font-semibold">
                                Locked
                            </div>
                        </div>
                    </div>

                    {/* Sender Name */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your name"
                            required
                            value={userQuery.username}
                            onChange={handleInput}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-colors"
                        />
                    </div>

                    {/* Inquiry Topic / Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Subject / Topic
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={userQuery.category}
                            onChange={handleInput}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white outline-none transition-colors"
                        >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                            <option value="Billing & Account">Billing & Account</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="queryMessage" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="queryMessage"
                            name="message"
                            rows={4}
                            placeholder="Type your message here..."
                            required
                            value={userQuery.message}
                            onChange={handleInput}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Submit Button with Loading State */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition-all duration-200 ${isSubmitting
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]"
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center space-x-2">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    />
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            "Send Message"
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
};