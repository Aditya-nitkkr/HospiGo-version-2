import { useNavigate } from "react-router-dom";
import { getHospitalImage } from "../assets/getHospitalImage";
import { IoLocationOutline } from "react-icons/io5";
import React from "react";

const HospitalComp = ({ currHospital }) => {
    const navigate = useNavigate();

    const handleHospitalDetails = () => {
        navigate(`/hospital/${currHospital._id}`, {
            state: { fromSearch: true, hospitalId: currHospital._id },
        });
    };

    return (
        <li className="list-none bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">

            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <img
                    src={getHospitalImage(currHospital._id)}
                    alt={currHospital.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">

                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {currHospital.name}
                </h2>

                <div className="flex items-start gap-2 text-gray-500 text-sm mb-6 flex-grow">
                    <IoLocationOutline className="text-lg flex-shrink-0 text-indigo-500 mt-0.5" />
                    <p className="line-clamp-3 leading-relaxed">
                        {currHospital.address}
                    </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <button
                        onClick={handleHospitalDetails}
                        className="w-full py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                    >
                        View Details
                    </button>
                </div>
            </div>

        </li>
    );
};

export const Hospital = React.memo(HospitalComp);