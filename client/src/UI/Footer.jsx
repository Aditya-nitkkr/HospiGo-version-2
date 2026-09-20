import footerCard from "../api/footer-section-api.json";
import { FooterDisplayCard } from "../components/FooterDisplayCard";
import { useLocation } from "react-router-dom";

export const Footer = () => {
    const location = useLocation();
    const isContactPage = location.pathname === "/contact";
    const isHospitalPage = location.pathname.startsWith("/hospital/");

    const showRedirect = !isHospitalPage && !isContactPage;

    return (
        <footer className={`bg-gray-900 text-gray-300 relative ${showRedirect ? 'pt-16 sm:pt-20' : 'pt-12'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    <div className="flex flex-col items-start">
                        <span className="text-3xl font-extrabold text-white tracking-tight">
                            HospiGo
                        </span>
                        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                            Streamlining your healthcare experience. Book, manage, and track your medical needs all in one place.
                        </p>
                    </div>

                    {footerCard.map((currData) => {
                        const { id, title, content1, content2, content3, content4 } = currData;
                        return (
                            <FooterDisplayCard 
                                key={id} 
                                title={title} 
                                content1={content1} 
                                content2={content2} 
                                content3={content3} 
                                content4={content4} 
                            />
                        );
                    })}
                </div>
            </div>
            <div className="border-t border-gray-800 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-gray-400 text-center md:text-left">
                        &copy; {new Date().getFullYear()} HospiGo. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <span className="hover:text-white cursor-pointer transition-colors duration-200">
                            Privacy Policy
                        </span>
                        <span className="hover:text-white cursor-pointer transition-colors duration-200">
                            Terms & Conditions
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};