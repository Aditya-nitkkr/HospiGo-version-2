import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export const Contact = () => {
    const form = useRef();
    const [userQuery, setUserQuery] = useState({
        username: "",
        email: "",
        message: "",
    });

    // handle the auto submit
    const handleOnsubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm("service_soqztyq", "template_yhpvhet", form.current, {
                publicKey: "VJNVaiakLtQ6Is-yh",
            })
            .then(
                () => {
                    toast.success("Mail Send Successfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setUserQuery({
                        username: "",
                        email: "",
                        message: "",
                    });
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    toast.error("Failed to send message. Please try again.");
                },
            );
    };

    // handle the user input
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserQuery({
            ...userQuery,
            [name]: value,
        });
    };

    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 md:p-10 rounded-2xl shadow-xl space-y-8">
                
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Get in touch with Us
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        We'd love to hear from you. Please fill out the form below.
                    </p>
                </div>

                {/* Form */}
                <form ref={form} onSubmit={handleOnsubmit} className="space-y-6">
                    {/* Username Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="username"
                            placeholder="Enter your Name"
                            autoComplete="off"
                            required
                            value={userQuery.username}
                            onChange={handleInput}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-colors"
                        />
                    </div>

                    {/* Email Input */}
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
                            value={userQuery.email}
                            onChange={handleInput}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-colors"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label htmlFor="queryMessage" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="queryMessage"
                            rows="5"
                            placeholder="Leave us a message"
                            required
                            value={userQuery.message}
                            onChange={handleInput}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none transition-colors resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};