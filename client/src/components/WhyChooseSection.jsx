import { Card } from "../UI/why-choose-card";
import chhoseCard from "../api/why-choose-api.json";

export const WhyChooseSection = () => {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
                        Why Choose Us
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                        Finding the right hospital and booking an appointment should be fast, easy, and stress-free. 
                        Our platform is designed to provide a seamless experience so you can focus on your health, 
                        not the hassle of searching for care.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {chhoseCard.map((currData) => {
                        const { id, image, title, description } = currData;
                        return (
                            <Card 
                                key={id} 
                                title={title} 
                                description={description} 
                                image={image} 
                            />
                        );
                    })}
                </div>
                
            </div>
        </section>
    );
};