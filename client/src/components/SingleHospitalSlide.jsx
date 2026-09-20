import React from "react";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
export const SingleHospitalSlide = React.memo(({ hospital }) => {
    return (
        <div className="p-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group cursor-pointer transform-gpu will-change-transform">

                <figure className="relative h-56 w-full bg-gray-100 overflow-hidden">
                    <img
                        src={hospital.image}
                        alt={hospital.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <MdOutlineStarBorderPurple500 className="text-purple-600 text-lg" />
                        <span className="text-sm font-bold text-gray-800">{hospital.rating}</span>
                    </div>
                </figure>

                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {hospital.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {hospital.desc}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <button className="w-full py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                            View More
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
});

SingleHospitalSlide.displayName = "SingleHospitalSlide";