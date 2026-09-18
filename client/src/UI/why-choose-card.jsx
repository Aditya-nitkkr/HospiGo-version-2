export const Card = ({ image, title, description }) => {
    return (
        <li className="list-none bg-gray-50 rounded-3xl p-6 sm:p-8 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 sm:gap-8 group">
            
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <img 
                    src={image} 
                    alt={`${title} icon`} 
                    className="w-full h-full object-contain"
                />
            </div>
            
            <div className="flex-1 sm:pt-2">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                    {description}
                </p>
            </div>
            
        </li>
    );
};