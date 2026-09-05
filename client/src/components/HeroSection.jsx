
import { IoSearchSharp } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";

export const HeroSection = () => {
    const { userRegister, isAuthenticated, setUserInput } = useAuth();
    const [userInputInSearch, setUserInputInSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceTimer = useRef(null);
    const latestRequestId = useRef(0); // guards against out-of-order responses
    const navigate = useNavigate();

    const handleUserInput = (event) => {
        const value = event.target.value;
        setUserInputInSearch(value);

        // Reset any pending debounce timer on every keystroke
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

                // console.log("response :", res.data);

                // Only apply this response if no newer request has been fired since
                if (requestId === latestRequestId.current) {
                    setSuggestions(Array.isArray(res.data) ? res.data : []);
                    setShowDropdown(true);
                }
            } catch (err) {
                // fail silently for suggestions — not worth surfacing an error for this
                console.log(err);
            }
        }, 350); // wait 350ms after the user stops typing
    };

    const handleSelectSuggestion = (suggestion) => {
        setUserInputInSearch(suggestion.display_name);
        console.log("suggestion name : ", suggestion.display_name);
        setShowDropdown(false);
        navigate(`/nearHospital?lat=${suggestion.lat}&lng=${suggestion.lon}`);
    }

    const handleLoadHospital = () => {
        setUserInput(userInputInSearch);
        // navigate("/nearHospital");
    }

    return (<section className="hero-section">
        <div className="container grid grid-two-cols main-sec">
            <div className="hero-content">
                <div className="hero-sub-heading">
                    {isAuthenticated && <span>Hey {userRegister.username}</span>}
                    {!isAuthenticated && <span>Welcome To the App</span>}
                </div>
                <p className="hero-sub-heading-para">Find the Best Hospitals Near You & Book Appointments Instantly</p>
                <p className="demo-content">Type "Rewari"  in search bar for demo </p>
                <div className="search-wrapper">
                    <input type="text" className="search-bar" value={userInputInSearch} onChange={handleUserInput} placeholder="Search here.." autoComplete="off" />

                    {showDropdown && suggestions.length > 0 && (
                        <ul className="suggestion-dropdown">
                            {suggestions.map((s, idx) => (
                                <li key={idx} onClick={() => handleSelectSuggestion(s)}>
                                    {s.display_name}
                                </li>
                            ))}
                        </ul>
                    )}

                    <button type="button" className="nearme-btn">
                        Near Me
                    </button>
                    {/* <NavLink to="/nearHospital"> */}
                    <button type="button" className="submit-btn" onClick={handleLoadHospital}>
                        <IoSearchSharp />
                    </button>
                    {/* </NavLink> */}
                </div>
                <div className="get-btn">

                    {!isAuthenticated && <NavLink to="/signup">
                        <button type="submit" className="get-started-btn"
                        >Get started
                            <FaCircleArrowRight className="right-arrow" />
                        </button>
                    </NavLink>}
                </div>
            </div>
            <div className="hero-image">
                <img src="hero-section-image.png" className="hero-img" alt="doctor patient image" />
            </div>
        </div>

    </section>);
}

