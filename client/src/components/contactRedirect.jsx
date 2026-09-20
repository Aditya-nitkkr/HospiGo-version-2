import { FaCircleArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const ContactRedirect = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 -mt-10 mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-8 border border-indigo-500/30">
                
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                    
                    <figure className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-white/10 rounded-full p-3 backdrop-blur-sm border border-white/20 shadow-inner">
                        <img 
                            src="contact-image.png" 
                            alt="Contact Us" 
                            className="w-full h-full object-contain" 
                        />
                    </figure>
                    
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white capitalize tracking-tight">
                            Get in touch with us
                        </h2>
                        <p className="mt-1.5 text-indigo-100 text-sm sm:text-base max-w-sm">
                            Have questions or need assistance? Our support team is here to help.
                        </p>
                    </div>
                </div>

                <div className="mt-6 md:mt-0 flex-shrink-0">
                    <NavLink to="/contact">
                        <button 
                            type="button" 
                            className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-indigo-600 hover:text-indigo-800 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                        >
                            Contact Us
                            <FaCircleArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </NavLink>
                </div>
                
            </div>
        </div>
    );
};