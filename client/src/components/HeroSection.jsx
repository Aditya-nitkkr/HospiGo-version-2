import { IoSearchSharp, IoLocationOutline } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef } from "react";
import axios from "axios";

export const HeroSection = () => {
    const { userRegister, isAuthenticated, setUserInput } = useAuth();
    const [userInputInSearch, setUserInputInSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceTimer = useRef(null);
    const latestRequestId = useRef(0); 
    const navigate = useNavigate();

    const handleUserInput = (event) => {
        const value = event.target.value;
        setUserInputInSearch(value);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (value.trim().length < 2) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        debounceTimer.current = setTimeout(async () => {
            const requestId = ++latestRequestId.current;
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search/autocomplete`, {
                    params: { query: value },
                });

                if (requestId === latestRequestId.current) {
                    setSuggestions(Array.isArray(res.data) ? res.data : []);
                    setShowDropdown(true);
                }
            } catch (err) {
                console.log(err);
            }
        }, 350); 
    };

    const handleSelectSuggestion = (suggestion) => {
        setUserInputInSearch(suggestion.display_name);
        setShowDropdown(false);
        navigate(`/nearHospital?lat=${suggestion.lat}&lng=${suggestion.lon}`);
    }

    const handleLoadHospital = () => {
        setUserInput(userInputInSearch);
    }

    return (
        <section className="relative bg-gradient-to-b from-indigo-50/50 to-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Content */}
                    <div className="flex flex-col items-start text-left">
                        
                        {/* Greeting Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-200 shadow-sm">
                            <span className="flex w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
                            {isAuthenticated ? `Hey, ${userRegister.username}` : "Welcome to HospiGo"}
                        </div>
                        
                        {/* Main Heading - Made smaller */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                            Find the Best Hospitals <span className="text-indigo-600">Near You</span> & Book Instantly
                        </h1>
                        
                        <p className="text-lg text-gray-600 mb-8 max-w-xl">
                            Search nearby hospitals, explore details, and book appointments effortlessly. Your health, simplified.
                        </p>

                        {/* Search Bar Wrapper */}
                        <div className="relative w-full max-w-2xl mb-8">
                            <div className="flex flex-col sm:flex-row items-center bg-white p-2 rounded-2xl sm:rounded-full shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
                                
                                <input 
                                    type="text" 
                                    value={userInputInSearch} 
                                    onChange={handleUserInput} 
                                    placeholder="Search for hospitals, cities, or areas..." 
                                    autoComplete="off"
                                    className="w-full flex-1 px-6 py-3 sm:py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base"
                                />

                                <div className="flex w-full sm:w-auto gap-2 mt-2 sm:mt-0 px-2 sm:px-0 pb-2 sm:pb-0">
                                    <button 
                                        type="button" 
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-xl sm:rounded-full hover:bg-indigo-100 transition-colors whitespace-nowrap"
                                    >
                                        <IoLocationOutline className="text-lg" />
                                        Near Me
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={handleLoadHospital}
                                        className="flex-1 sm:flex-none flex items-center justify-center p-3 sm:px-8 sm:py-3 bg-indigo-600 text-white rounded-xl sm:rounded-full hover:bg-indigo-700 hover:shadow-md transition-all"
                                    >
                                        <IoSearchSharp className="text-xl sm:hidden" />
                                        <span className="hidden sm:block font-semibold">Search</span>
                                    </button>
                                </div>
                            </div>

                            {/* Autocomplete Dropdown - Scrollable Box */}
                            {showDropdown && suggestions.length > 0 && (
                                <ul className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto z-50 divide-y divide-gray-50">
                                    {suggestions.map((s, idx) => (
                                        <li 
                                            key={idx} 
                                            onClick={() => handleSelectSuggestion(s)}
                                            className="px-6 py-3.5 hover:bg-indigo-50 text-gray-700 cursor-pointer transition-colors flex items-center gap-3 text-sm sm:text-base"
                                        >
                                            <IoLocationOutline className="text-gray-400 flex-shrink-0 text-lg" />
                                            <span className="truncate">{s.display_name}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* CTA Button */}
                        {!isAuthenticated && (
                            <NavLink to="/signup">
                                <button 
                                    type="button" 
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    Get Started
                                    <FaCircleArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </NavLink>
                        )}
                    </div>

                    {/* Right Content / Image */}
                    <div className="relative w-full h-full flex justify-center items-center lg:justify-end mt-8 lg:mt-0">
                        {/* Decorative background blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                        <img 
                            src="hero-section-image.png" 
                            alt="Doctor and patient consultation" 
                            className="w-full max-w-lg lg:max-w-xl object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};