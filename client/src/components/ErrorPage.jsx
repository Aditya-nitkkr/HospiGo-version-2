import { NavLink } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";

export const ErrorPage = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 text-center flex flex-col items-center">
                
                {/* Icon Wrapper */}
                <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 shadow-inner">
                    <FaExclamationTriangle className="text-4xl" />
                </div>

                {/* Error Code */}
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full mb-3 border border-indigo-100">
                    404 Error
                </span>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Home Navigation Button */}
                <NavLink to="/" className="w-full">
                    <button 
                        type="button" 
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                        Back to Homepage
                        <FaCircleArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </NavLink>

            </div>
        </div>
    );
};