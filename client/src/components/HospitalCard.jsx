import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Importing images from your assets folder
import hospitalImg1 from "../assets/hospital-image-1.jpg";
import hospitalImg2 from "../assets/hospital-image-2.jpg";
import hospitalImg3 from "../assets/hospital-image-3.jpg";
import hospitalImg4 from "../assets/hospital-image-4.jpg";
import hospitalImg5 from "../assets/hospital-image-5.jpg";

// Assigning the imported variables to the data array
const hospitalData = [
    {
        id: 1,
        title: "Sunrise City Hospital, Mumbai",
        desc: "Comprehensive emergency and trauma care with specialized cardiac and orthopedic services.",
        image: hospitalImg1,
        rating: "4.5",
    },
    {
        id: 2,
        title: "Green Leaf Clinic, Mumbai",
        desc: "Leading women and child care center with experienced pediatric and gynecology specialists.",
        image: hospitalImg2,
        rating: "4.2",
    },
    {
        id: 3,
        title: "Hopewell Center, Mumbai",
        desc: "24/7 patient care with advanced diagnostics and multispecialty services for all age groups.",
        image: hospitalImg3,
        rating: "4.3",
    },
    {
        id: 4,
        title: "Lifeline Super Speciality",
        desc: "Best-in-class surgery and post-operative care with a dedicated intensive care unit.",
        image: hospitalImg4,
        rating: "4.7",
    },
    {
        id: 5,
        title: "Apollo Care Hospital, Mumbai",
        desc: "Internationally accredited, known for organ transplant and minimally invasive procedures.",
        image: hospitalImg5,
        rating: "4.6",
    },
];

export const HospitalCard = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Top Rated Hospitals
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Discover top-tier healthcare facilities equipped with advanced technology and expert medical professionals.
                    </p>
                </div>

                {/* Slider Container */}
                <div className="-mx-3">
                    <Slider {...settings}>
                        {hospitalData.map((hospital) => (
                            <div key={hospital.id} className="p-3">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer">

                                    {/* Card Image */}
                                    <figure className="relative h-56 overflow-hidden">
                                        <img
                                            src={hospital.image}
                                            alt={hospital.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                            <MdOutlineStarBorderPurple500 className="text-purple-600 text-lg" />
                                            <span className="text-sm font-bold text-gray-800">{hospital.rating}</span>
                                        </div>
                                    </figure>

                                    {/* Card Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                            {hospital.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                            {hospital.desc}
                                        </p>

                                        {/* Card Action */}
                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <button className="w-full py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                                                View More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};