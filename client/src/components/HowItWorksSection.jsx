import { useLocation } from "react-router-dom";
import StepData from "../api/Step-api.json";
import { Step } from "../UI/StepCard";

export const HowItWorksSection = () => {
    const location = useLocation();
    const isAboutPage = location.pathname === "/about";

    return (
        <section 
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 ${
                isAboutPage ? 'mb-[20rem]' : 'mb-20'
            }`}
        >
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                    Process
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
                    How It Works
                </p>
                <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                    Search nearby hospitals, explore details, book appointments instantly, and navigate with ease—all in one app.
                </p>
            </div>

            {/* Steps Grid Layout */}
            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {StepData.map((currStep) => {
                        const { id, StepNumber, StepTitle, StepDescription } = currStep;
                        return (
                            <Step 
                                key={id} 
                                StepNumber={StepNumber} 
                                StepTitle={StepTitle} 
                                StepDescription={StepDescription} 
                            />
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};