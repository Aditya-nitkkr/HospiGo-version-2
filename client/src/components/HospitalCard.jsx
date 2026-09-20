import React, { useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { hospitalData } from "../api/home-page-hospital-api";
import { SingleHospitalSlide } from "./SingleHospitalSlide";

export const HospitalCard = () => {
    const settings = useMemo(() => ({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: "ondemand", // Slick's internal lazy-load to prevent mounting offscreen cloned DOM nodes
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }), []);

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Top Rated Hospitals
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Discover top-tier healthcare facilities equipped with advanced technology and expert medical professionals.
                    </p>
                </div>

                <div className="-mx-3">
                    <Slider {...settings}>
                        {hospitalData.map((hospital) => (
                            <SingleHospitalSlide key={hospital.id} hospital={hospital} />
                        ))}
                    </Slider>
                </div>

            </div>
        </section>
    );
};